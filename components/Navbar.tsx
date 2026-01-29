"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LayoutDashboard, Car, Users, ClipboardList } from "lucide-react";

export function Navbar() {
    const { data: session, status } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";
    const isLoading = status === "loading";

    return (
        <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-all">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <div className="mr-8 flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2 group">
                        <img
                            src="/images/logo.png"
                            alt="Delian Logo"
                            className="h-10 w-10 object-contain group-hover:scale-110 transition-transform"
                        />
                        <span className="hidden font-black sm:inline-block text-[#222222] text-2xl tracking-tighter">
                            DELIAN
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wider">
                        <Link
                            href="/#fleet"
                            className="transition-colors hover:text-[#F3D88D] text-[#222222]"
                        >
                            Armada
                        </Link>

                        {isAdmin && (
                            <>
                                <Link
                                    href="/vehicles"
                                    className="transition-colors hover:text-[#F3D88D] text-[#222222]"
                                >
                                    Fleet Management
                                </Link>
                                <Link
                                    href="/customers"
                                    className="transition-colors hover:text-[#F3D88D] text-[#222222]"
                                >
                                    Pelanggan
                                </Link>
                                <Link
                                    href="/rentals"
                                    className="transition-colors hover:text-[#F3D88D] text-[#665D4D]"
                                >
                                    Transaksi
                                </Link>
                            </>
                        )}

                        {!isAdmin && session && (
                            <Link
                                href="/my-reservations"
                                className="transition-colors hover:text-[#F3D88D] text-[#222222]"
                            >
                                Reservasi Saya
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    {isLoading ? (
                        <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-full" />
                    ) : session ? (
                        <div className="flex items-center space-x-4">
                            <span className="hidden sm:inline-block text-xs font-bold bg-[#F3D88D] text-[#222222] px-3 py-1 rounded-full border border-[#DED6C4]">
                                {session.user?.role}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-[#F9F3E5] border border-[#DED6C4] hover:border-[#F3D88D] transition-colors">
                                        <User className="h-5 w-5 text-[#222222]" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 mt-2 shadow-2xl border-[#DED6C4]" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal border-b pb-4 pt-2">
                                        <div className="flex flex-col space-y-2">
                                            <p className="text-sm font-bold text-[#222222]">{session.user?.name}</p>
                                            <p className="text-xs leading-none text-[#665D4D]">
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <div className="py-2">
                                        {isAdmin ? (
                                            <DropdownMenuItem asChild className="focus:bg-[#F9F3E5]">
                                                <Link href="/vehicles" className="w-full flex items-center cursor-pointer py-2 px-3">
                                                    <LayoutDashboard className="mr-3 h-4 w-4" />
                                                    <span>Admin Dashboard</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem asChild className="focus:bg-[#F9F3E5]">
                                                <Link href="/my-reservations" className="w-full flex items-center cursor-pointer py-2 px-3">
                                                    <ClipboardList className="mr-3 h-4 w-4" />
                                                    <span>Pesanan Saya</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                    </div>
                                    <DropdownMenuSeparator className="bg-[#DED6C4]" />
                                    <DropdownMenuItem
                                        className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer py-3 rounded-none"
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        <span className="font-bold">Keluar Aplikasi</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/login"
                                className="text-sm font-bold text-[#222222] hover:text-[#665D4D] transition-colors"
                            >
                                MASUK
                            </Link>
                            <Button className="bg-[#222222] text-[#F9F3E5] hover:bg-[#F3D88D] hover:text-[#222222] rounded-full px-8 font-black text-xs tracking-widest transition-all" asChild>
                                <Link href="/register">DAFTAR</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
