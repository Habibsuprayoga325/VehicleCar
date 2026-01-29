"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor asli
    const message = "Halo Sewa Kendaraan Delian, saya ingin bertanya tentang penyewaan kendaraan.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold">
                &nbsp; Chat Kami
            </span>
        </a>
    );
}
