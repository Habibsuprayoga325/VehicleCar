"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Gift, Sparkles } from "lucide-react";

type Promo = {
    id: string;
    title: string;
    desc: string;
    code: string;
    color: "dark" | "yellow";
    image: string;
    badge: string;
};

const promos: Promo[] = [
    {
        id: "weekend",
        title: "DISKON AKHIR PEKAN",
        desc: "Potongan harga hingga 20% untuk penyediaan mobil MPV di hari Sabtu & Minggu.",
        code: "WEEKEND20",
        color: "dark",
        image: "/images/fleet/avanza.jpg",
        badge: "Limited Offer"
    },
    {
        id: "new",
        title: "WARGA BARU DELIAN",
        desc: "Gunakan kode promo DELIAN10 untuk diskon 10% pada transaksi pertama Anda.",
        code: "DELIAN10",
        color: "yellow",
        image: "/images/fleet/alphard.jpg",
        badge: "New Customer"
    }
];

export function PromotionSection() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleClaim = (promo: Promo) => {
        navigator.clipboard.writeText(promo.code);
        setCopiedId(promo.id);

        // Store in session storage for ReservationDialog to pick up
        sessionStorage.setItem("activePromo", promo.code);

        setTimeout(() => {
            setCopiedId(null);
            // Optional: scroll to fleet after a delay
            const fleetEl = document.getElementById("fleet");
            if (fleetEl) fleetEl.scrollIntoView({ behavior: "smooth" });
        }, 1500);
    };

    return (
        <section id="promos" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3D88D]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#222222]/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center space-x-2 bg-[#F9F3E5] px-4 py-2 rounded-full border border-[#DED6C4] mb-6">
                        <Sparkles className="h-4 w-4 text-[#F3D88D]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#222222]">Special Offers for You</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#222222] mb-6 tracking-tighter uppercase leading-none">
                        Penawaran <span className="text-[#F3D88D]">Terbaik</span>
                    </h2>
                    <div className="h-2 w-32 bg-[#F3D88D] mx-auto rounded-full mb-8"></div>
                    <p className="text-xl text-[#665D4D] max-w-2xl mx-auto font-medium leading-relaxed">
                        Nikmati perjalanan premium dengan harga lebih hemat menggunakan promo eksklusif kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-14 shadow-2xl transition-all hover:scale-[1.02] duration-500
                ${promo.color === "dark"
                                    ? "bg-[#222222] text-[#F9F3E5] border-none"
                                    : "bg-[#F3D88D] text-[#222222] border-none"}`}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6">
                                    <span className={`inline-block px-4 py-2 text-[10px] font-black tracking-[0.2em] rounded-full uppercase shadow-sm
                    ${promo.color === "dark" ? "bg-[#F3D88D] text-[#222222]" : "bg-[#222222] text-[#F9F3E5]"}`}>
                                        {promo.badge}
                                    </span>
                                </div>

                                <h3 className="mb-4 text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
                                    {promo.title}
                                </h3>

                                <p className={`mb-auto text-lg font-medium leading-relaxed opacity-80 max-w-md
                  ${promo.color === "dark" ? "text-gray-300" : "text-[#665D4D]"}`}>
                                    {promo.desc}
                                </p>

                                <div className="mt-12 flex flex-wrap items-center gap-4">
                                    <div className={`flex items-center border-2 border-dashed px-6 py-4 rounded-2xl font-black text-xl tracking-widest
                    ${promo.color === "dark" ? "border-[#F3D88D]/50 text-[#F3D88D]" : "border-[#222222]/30 text-[#222222]"}`}>
                                        {promo.code}
                                    </div>

                                    <Button
                                        onClick={() => handleClaim(promo)}
                                        className={`px-8 py-8 rounded-2xl font-black text-lg min-w-[180px] transition-all
                      ${promo.color === "dark"
                                                ? "bg-[#F3D88D] text-[#222222] hover:bg-white"
                                                : "bg-[#222222] text-[#F9F3E5] hover:bg-[#333333]"}`}
                                    >
                                        {copiedId === promo.id ? (
                                            <span className="flex items-center">
                                                <Check className="mr-2 h-6 w-6" /> CLAIMED
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <Copy className="mr-2 h-6 w-6" /> KLAIM PROMO
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Decorative side image */}
                            <div className="absolute right-[-5%] bottom-[-5%] w-72 h-auto opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 pointer-events-none">
                                <img src={promo.image} alt="" className="w-full h-full object-contain rotate-12" />
                            </div>

                            <div className="absolute top-8 right-8 text-6xl opacity-20 transform -rotate-12 group-hover:rotate-0 transition-all">
                                <Gift className="h-16 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
