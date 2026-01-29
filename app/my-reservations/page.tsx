import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Car, Clock, CreditCard } from "lucide-react";

export default async function MyReservationsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const reservations = await prisma.transaction.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            vehicle: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="container mx-auto py-10 px-4 min-h-screen bg-[#F9F3E5]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-[#222222] tracking-tighter mb-2">RESERVASI SAYA</h1>
                    <p className="text-[#665D4D] font-medium">Riwayat dan status pemesanan kendaraan Anda.</p>
                    <div className="h-1.5 w-20 bg-[#F3D88D] mt-4 rounded-full"></div>
                </div>

                {reservations.length === 0 ? (
                    <Card className="border-dashed border-2 bg-transparent border-[#DED6C4] py-20 text-center">
                        <CardContent className="space-y-4">
                            <Car className="h-16 w-16 mx-auto text-[#DED6C4]" />
                            <p className="text-xl font-bold text-[#665D4D]">Belum ada reservasi aktif.</p>
                            <a href="/#fleet" className="inline-block bg-[#222222] text-[#F9F3E5] px-8 py-3 rounded-full font-bold hover:bg-[#333333] transition-all">
                                Cari Kendaraan Sekarang
                            </a>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {reservations.map((res) => (
                            <Card key={res.id} className="overflow-hidden border-none shadow-lg bg-white group hover:shadow-xl transition-all">
                                <div className="md:flex">
                                    <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                                        <img
                                            src={`/images/fleet/${res.vehicle.name.toLowerCase().split(' ').join('_')}.jpg`}
                                            alt={res.vehicle.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/fleet/avanza.jpg'
                                            }}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className={`
                                                ${res.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    res.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                                                        res.status === 'RETURNED' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'}
                                                px-3 py-1 font-bold border-none
                                            `}>
                                                {res.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-black text-[#222222] tracking-tight">
                                                    {res.vehicle.name}
                                                </h3>
                                                <span className="text-[#665D4D] text-xs font-bold uppercase tracking-widest bg-[#F9F3E5] px-2 py-1 rounded border border-[#DED6C4]">
                                                    ID: #{res.id}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="flex items-center text-sm text-[#665D4D]">
                                                    <CalendarDays className="mr-2 h-4 w-4 text-[#F3D88D]" />
                                                    <span>Mulai: <strong>{new Date(res.startDate).toLocaleDateString('id-ID')}</strong></span>
                                                </div>
                                                <div className="flex items-center text-sm text-[#665D4D]">
                                                    <Clock className="mr-2 h-4 w-4 text-[#F3D88D]" />
                                                    <span>Selesai: <strong>{new Date(res.endDate).toLocaleDateString('id-ID')}</strong></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-[#F2EDE1]">
                                            <div className="flex items-center">
                                                <CreditCard className="mr-2 h-5 w-5 text-[#665D4D]" />
                                                <span className="text-sm font-medium text-[#665D4D]">Total Bayar:</span>
                                            </div>
                                            <span className="text-2xl font-black text-[#222222]">
                                                Rp {res.totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
