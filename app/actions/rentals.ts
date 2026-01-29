"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRental(formData: FormData) {
    const vehicleId = parseInt(formData.get("vehicleId") as string);
    const customerId = parseInt(formData.get("customerId") as string);
    const startDateStr = formData.get("startDate") as string;
    const endDateStr = formData.get("endDate") as string;

    if (!vehicleId || !customerId || !startDateStr || !endDateStr) {
        throw new Error("Missing required fields");
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Transaction: Create Rental + Update Vehicle Stock
    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                vehicleId,
                customerId,
                startDate,
                endDate,
                totalPrice: 0, // Calculated upon return usually, or estimated. Let's keep 0 for now until return.
                fine: 0,
                status: "ONGOING",
            },
        }),
        prisma.vehicle.update({
            where: { id: vehicleId },
            data: { isAvailable: false },
        }),
    ]);

    revalidatePath("/rentals");
    revalidatePath("/vehicles"); // Stock updated
}

export async function returnRental(formData: FormData) {
    const transactionId = parseInt(formData.get("transactionId") as string);
    const returnDateStr = formData.get("returnDate") as string;
    const fine = parseFloat((formData.get("fine") as string) || "0");

    const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: { vehicle: true },
    });

    if (!transaction) throw new Error("Transaction not found");

    const returnDate = new Date(returnDateStr);

    // Calculate duration in days (round up)
    const diffTime = Math.abs(returnDate.getTime() - transaction.startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // If same day, count as 1

    const totalPrice = diffDays * transaction.vehicle.pricePerDay;

    await prisma.$transaction([
        prisma.transaction.update({
            where: { id: transactionId },
            data: {
                returnDate,
                status: "RETURNED",
                totalPrice,
                fine,
            },
        }),
        prisma.vehicle.update({
            where: { id: transaction.vehicleId },
            data: { isAvailable: true },
        }),
    ]);

    revalidatePath("/rentals");
    revalidatePath("/vehicles");
}

export async function getActiveRentals() {
    return await prisma.transaction.findMany({
        where: { status: "ONGOING" },
        include: {
            vehicle: true,
            customer: true,
        },
        orderBy: { startDate: "desc" },
    });
}

export async function getRentalHistory() {
    return await prisma.transaction.findMany({
        include: {
            vehicle: true,
            customer: true,
        },
        orderBy: { createdAt: "desc" },
    });
}
export async function createReservation(formData: FormData) {
    const vehicleId = parseInt(formData.get("vehicleId") as string);
    const userId = formData.get("userId") as string;
    const startDateStr = formData.get("startDate") as string;
    const endDateStr = formData.get("endDate") as string;
    const promoCode = formData.get("promoCode") as string;

    if (!vehicleId || !userId || !startDateStr || !endDateStr) {
        throw new Error("Missing required fields");
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId }
    });

    if (!vehicle) throw new Error("Vehicle not found");

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    let totalPrice = diffDays * vehicle.pricePerDay;

    // Server-side promo logic
    if (promoCode === "WEEKEND20") totalPrice *= 0.8;
    if (promoCode === "DELIAN10") totalPrice *= 0.9;

    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                vehicleId,
                userId,
                startDate,
                endDate,
                totalPrice,
                status: "PENDING",
            },
        }),
        prisma.vehicle.update({
            where: { id: vehicleId },
            data: { isAvailable: false },
        }),
    ]);

    revalidatePath("/");
    revalidatePath("/my-reservations");
}
