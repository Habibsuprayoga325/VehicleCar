"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation } from "@/app/actions/rentals";
import { CalendarDays, Car, CreditCard } from "lucide-react";

type Props = {
    vehicle: { id: number; name: string; pricePerDay: number; image: string };
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function ReservationDialog({ vehicle, open, onOpenChange }: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [promoCode, setPromoCode] = useState("");

    // Read promo from session storage
    useState(() => {
        if (typeof window !== "undefined") {
            const savedPromo = sessionStorage.getItem("activePromo");
            if (savedPromo) setPromoCode(savedPromo);
        }
    });

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("vehicleId", vehicle.id.toString());
            formData.append("userId", session.user.id);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            if (promoCode) formData.append("promoCode", promoCode);

            await createReservation(formData);

            // Clear promo after successful booking
            sessionStorage.removeItem("activePromo");

            onOpenChange(false);
            router.push("/my-reservations");
        } catch (error) {
            console.error(error);
            alert("Gagal membuat reservasi. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate estimated price
    const calculatePrice = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        let price = diffDays * vehicle.pricePerDay;

        // Simple discount logic
        if (promoCode === "WEEKEND20") price *= 0.8;
        if (promoCode === "DELIAN10") price *= 0.9;

        return price;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] border-none shadow-2xl bg-[#F9F3E5]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-[#222222] flex items-center">
                        <Car className="mr-2 h-6 w-6 text-[#F3D88D]" />
                        Konfirmasi Reservasi
                    </DialogTitle>
                    <DialogDescription className="text-[#665D4D]">
                        Lengkapi detail perjalanan Anda untuk memesan <strong>{vehicle.name}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleBooking} className="space-y-6 pt-4">
                    <div className="bg-white p-4 rounded-xl border border-[#DED6C4] space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#665D4D]">Kendaraan:</span>
                            <span className="font-bold text-[#222222]">{vehicle.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#665D4D]">Harga per Hari:</span>
                            <span className="font-bold text-[#222222]">Rp {vehicle.pricePerDay.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-[#222222] font-bold flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4 text-[#665D4D]" />
                                Tanggal Mulai
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="border-[#DED6C4] focus:ring-[#F3D88D] rounded-lg bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate" className="text-[#222222] font-bold flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4 text-[#665D4D]" />
                                Tanggal Selesai
                            </Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="border-[#DED6C4] focus:ring-[#F3D88D] rounded-lg bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="promoCode" className="text-[#222222] font-bold">Kode Promo</Label>
                        <div className="flex space-x-2">
                            <Input
                                id="promoCode"
                                placeholder="Masukkan kode promo"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                className="border-[#DED6C4] focus:ring-[#F3D88D] rounded-lg bg-white uppercase font-black tracking-widest"
                            />
                            {promoCode && (
                                <div className="bg-[#F3D88D] text-[#222222] px-3 py-2 rounded-lg flex items-center justify-center font-bold text-xs">
                                    APPLIED
                                </div>
                            )}
                        </div>
                    </div>

                    {startDate && endDate && (
                        <div className="bg-[#222222] text-[#F9F3E5] p-5 rounded-xl space-y-2 bg-gradient-to-br from-[#222222] to-[#333333]">
                            <div className="flex justify-between items-center text-xs text-gray-400">
                                <span>Subtotal:</span>
                                <span>Rp {(calculatePrice() / (promoCode === "WEEKEND20" ? 0.8 : promoCode === "DELIAN10" ? 0.9 : 1)).toLocaleString()}</span>
                            </div>
                            {promoCode && (
                                <div className="flex justify-between items-center text-xs text-[#F3D88D]">
                                    <span>Potongan Promo:</span>
                                    <span>- Rp {((calculatePrice() / (promoCode === "WEEKEND20" ? 0.8 : promoCode === "DELIAN10" ? 0.9 : 1)) - calculatePrice()).toLocaleString()}</span>
                                </div>
                            )}
                            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                                <div className="flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5 text-[#F3D88D]" />
                                    <span className="text-sm font-black">TOTAL BAYAR:</span>
                                </div>
                                <span className="text-2xl font-black text-[#F3D88D]">
                                    Rp {calculatePrice().toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#222222] text-[#F9F3E5] hover:bg-[#333333] py-6 rounded-xl font-bold text-lg transition-all active:scale-95"
                        >
                            {loading ? "Memproses..." : session ? "Konfirmasi Pesanan" : "Masuk untuk Memesan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
