"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
    return await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCustomer(formData: FormData) {
    const name = formData.get("name") as string;
    const nik = formData.get("nik") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!name || !nik || !phone) {
        throw new Error("Missing required fields");
    }

    await prisma.customer.create({
        data: {
            name,
            nik,
            phone,
            address,
        },
    });

    revalidatePath("/customers");
}

export async function deleteCustomer(id: number) {
    await prisma.customer.delete({ where: { id } });
    revalidatePath("/customers");
}
