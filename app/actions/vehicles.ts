"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getVehicles() {
    return await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAvailableVehicles() {
    return await prisma.vehicle.findMany({
        where: { isAvailable: true },
        orderBy: { name: "asc" }
    });
}

export async function createVehicle(formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const licensePlate = formData.get("licensePlate") as string;
    const pricePerDay = parseFloat(formData.get("pricePerDay") as string);

    if (!name || !type || !licensePlate || !pricePerDay) {
        throw new Error("Missing required fields");
    }

    await prisma.vehicle.create({
        data: {
            name,
            type,
            licensePlate,
            pricePerDay,
            isAvailable: true,
        },
    });

    revalidatePath("/vehicles");
}

export async function deleteVehicle(id: number) {
    const transactionCount = await prisma.transaction.count({
        where: { vehicleId: id }
    });

    if (transactionCount > 0) {
        throw new Error("Cannot delete vehicle because it has existing rental history.");
    }

    await prisma.vehicle.delete({ where: { id } });
    revalidatePath("/vehicles");
}

export async function updateVehicle(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const licensePlate = formData.get("licensePlate") as string;
    const pricePerDay = parseFloat(formData.get("pricePerDay") as string);

    await prisma.vehicle.update({
        where: { id },
        data: {
            name,
            type,
            licensePlate,
            pricePerDay,
        },
    });

    revalidatePath("/vehicles");
}
