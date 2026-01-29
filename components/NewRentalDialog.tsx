"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createRental } from "@/app/actions/rentals";

type Props = {
    vehicles: { id: number; name: string; licensePlate: string; pricePerDay: number }[];
    customers: { id: number; name: string; nik: string }[];
};

export function NewRentalDialog({ vehicles, customers }: Props) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        await createRental(formData);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New Rental</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>New Rental Transaction</DialogTitle>
                    <DialogDescription>
                        Create a new rental. Only available vehicles are shown.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="customer" className="text-right">
                                Customer
                            </Label>
                            <div className="col-span-3">
                                <Select name="customerId" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.name} ({c.nik})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="vehicle" className="text-right">
                                Vehicle
                            </Label>
                            <div className="col-span-3">
                                <Select name="vehicleId" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Vehicle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicles.map((v) => (
                                            <SelectItem key={v.id} value={v.id.toString()}>
                                                {v.name} - {v.licensePlate} (Rp {v.pricePerDay.toLocaleString()})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startDate" className="text-right">
                                Start Date
                            </Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                className="col-span-3"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endDate" className="text-right">
                                End Date (Est.)
                            </Label>
                            <Input
                                id="endDate"
                                name="endDate"
                                type="date"
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Rental</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
