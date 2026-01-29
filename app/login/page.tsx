"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Email atau password salah");
            } else {
                // Refresh session and redirect
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Terjadi kesalahan saat login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <Card className="w-full max-w-md border-none shadow-2xl bg-white">
                <CardHeader className="text-center space-y-1">
                    <div className="flex justify-center mb-4">
                        <img src="/images/logo.png" alt="Delian Logo" className="h-12 w-12 object-contain" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#222222]">Welcome Back</CardTitle>
                    <CardDescription className="text-[#665D4D]">
                        Masuk ke akun Sewa Kendaraan Delian Anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">{error}</div>}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-[#DED6C4] focus:ring-[#F3D88D]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-[#DED6C4] focus:ring-[#F3D88D]"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#222222] text-[#F9F3E5] hover:bg-[#333333] font-bold py-6 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? "Memproses..." : "Masuk"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-[#665D4D]">
                    Belum punya akun?&nbsp;
                    <Link href="/register" className="text-[#222222] font-bold hover:underline">
                        Daftar Sekarang
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
