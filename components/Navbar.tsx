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
import { User, LogOut, LayoutDashboard, Car, Users, ClipboardList, Menu, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";

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

                <div className="flex items-center justify-end space-x-4 md:flex-1">
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoading ? (
                            <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-full" />
                        ) : session ? (
                            <div className="flex items-center space-x-4">
                                <span className="hidden lg:inline-block text-xs font-bold bg-[#F3D88D] text-[#222222] px-3 py-1 rounded-full border border-[#DED6C4]">
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

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden flex items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Menu className="h-6 w-6 text-[#222222]" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xs h-[100dvh] flex flex-col p-6 border-none bg-white">
                                <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
                                    <DialogTitle className="text-left">
                                        <div className="flex items-center space-x-2">
                                            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
                                            <span className="font-black text-[#222222] text-xl tracking-tighter">DELIAN</span>
                                        </div>
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col space-y-6 flex-1 overflow-y-auto">
                                    <div className="flex flex-col space-y-4">
                                        <Link href="/" className="text-lg font-bold text-[#222222] hover:text-[#F3D88D]">Home</Link>
                                        <Link href="/#fleet" className="text-lg font-bold text-[#222222] hover:text-[#F3D88D]">Armada</Link>
                                        {isAdmin && (
                                            <>
                                                <Link href="/vehicles" className="text-lg font-bold text-[#222222] hover:text-[#F3D88D]">Fleet Management</Link>
                                                <Link href="/customers" className="text-lg font-bold text-[#222222] hover:text-[#F3D88D]">Pelanggan</Link>
                                                <Link href="/rentals" className="text-lg font-bold text-[#222222] hover:text-[#F3D88D]">Transaksi</Link>
                                            </>
                                        )}
                                        {session && !isAdmin && (
                                            <Link href="/my-reservations" className="text-lg font-bold text-[#222222] hover:text-[#F3D88D]">Reservasi Saya</Link>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t mt-auto">
                                        {session ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3 p-3 bg-[#F9F3E5] rounded-2xl">
                                                    <div className="h-10 w-10 rounded-full bg-[#F3D88D] flex items-center justify-center">
                                                        <User className="h-5 w-5 text-[#222222]" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <p className="text-sm font-bold text-[#222222] truncate">{session.user?.name}</p>
                                                        <p className="text-xs text-[#665D4D] truncate">{session.user?.email}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start text-red-600 border-red-100 hover:bg-red-50 py-6 rounded-2xl font-bold"
                                                    onClick={() => signOut({ callbackUrl: "/" })}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" /> Keluar Aplikasi
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button variant="outline" className="border-[#DED6C4] font-bold py-6 rounded-2xl" asChild>
                                                    <Link href="/login">MASUK</Link>
                                                </Button>
                                                <Button className="bg-[#222222] text-[#F9F3E5] font-bold py-6 rounded-2xl" asChild>
                                                    <Link href="/register">DAFTAR</Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </nav>
    );
}
