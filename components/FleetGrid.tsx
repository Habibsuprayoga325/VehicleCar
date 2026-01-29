"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReservationDialog } from "./ReservationDialog";

type Car = {
    id: number;
    name: string;
    image: string;
    price: string;
    priceRaw: number;
    description: string;
    specs: string[];
    badge?: string;
};

const fleet: Car[] = [
    {
        id: 1,
        name: "Toyota Avanza",
        image: "/images/fleet/avanza.jpg",
        price: "Rp 500.000",
        priceRaw: 500000,
        description: "Mobil MPV keluarga yang nyaman dan irit bahan bakar.",
        specs: ["7 Kursi", "AC Double Blower", "Manual/Matic"],
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Toyota Alphard",
        image: "/images/fleet/alphard.jpg",
        price: "Rp 2.500.000",
        priceRaw: 2500000,
        description: "Luxury MPV untuk kenyamanan dan prestise perjalanan Anda.",
        specs: ["7 Kursi", "Captain Seat", "Matic"],
        badge: "Executive Choice"
    },
    {
        id: 3,
        name: "Innova Zenix",
        image: "/images/fleet/innova_zenix.jpg",
        price: "Rp 900.000",
        priceRaw: 900000,
        description: "Generasi terbaru Innova dengan teknologi Hybrid yang canggih.",
        specs: ["7 Kursi", "Panoramic Roof", "Matic"],
        badge: "Limited"
    },
    {
        id: 4,
        name: "Innova Reborn",
        image: "/images/fleet/innova_reborn.jpg",
        price: "Rp 700.000",
        priceRaw: 700000,
        description: "Mobil tangguh dan nyaman untuk segala kondisi jalan.",
        specs: ["7 Kursi", "Diesel/Bensin", "Manual/Matic"]
    },
    {
        id: 5,
        name: "Toyota Raize",
        image: "/images/fleet/raize.jpg",
        price: "Rp 450.000",
        priceRaw: 450000,
        description: "Compact SUV lincah yang cocok untuk perkotaan.",
        specs: ["5 Kursi", "Turbo Engine", "Matic"]
    }
];

export function FleetGrid() {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleReserve = (car: Car) => {
        setSelectedCar(car);
        setIsDialogOpen(true);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fleet.map((car) => (
                    <Card key={car.id} className="overflow-hidden border-none shadow-xl hover:scale-[1.02] transition-transform duration-300 bg-white group/card">
                        <div className="h-56 overflow-hidden relative">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-[#F3D88D] text-[#222222] font-black px-4 py-1.5 rounded-full text-sm shadow-lg border border-white/20">
                                {car.price} / Hari
                            </div>
                            {car.badge && (
                                <div className="absolute top-4 left-4 bg-[#222222]/80 backdrop-blur-md text-[#F3D88D] font-black px-3 py-1 rounded text-[10px] uppercase tracking-widest border border-[#F3D88D]/30">
                                    {car.badge}
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl text-[#222222] font-black tracking-tight">{car.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#665D4D] mb-4 text-sm leading-relaxed min-h-[40px]">
                                {car.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {car.specs.map((spec, i) => (
                                    <span key={i} className="bg-[#F9F3E5] text-[#222222] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-[#DED6C4]">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleReserve(car)}
                                className="w-full bg-[#222222] text-[#F9F3E5] hover:bg-[#F3D88D] hover:text-[#222222] font-bold py-7 rounded-xl transition-all shadow-md active:scale-95"
                            >
                                Reservasi Sekarang
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {selectedCar && (
                <ReservationDialog
                    vehicle={{
                        id: selectedCar.id,
                        name: selectedCar.name,
                        pricePerDay: selectedCar.priceRaw,
                        image: selectedCar.image
                    }}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            )}
        </div>
    );
}
