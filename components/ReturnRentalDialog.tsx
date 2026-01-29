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
import { returnRental } from "@/app/actions/rentals";

type Props = {
    transaction: {
        id: number;
        startDate: Date;
        vehicle: { name: string; licensePlate: string; pricePerDay: number };
        customer: { name: string };
    };
};

export function ReturnRentalDialog({ transaction }: Props) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        await returnRental(formData);
        setOpen(false);
    }

    // Calculate estimated price client-side for display
    const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);

    const start = new Date(transaction.startDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const estimatedPrice = diffDays * transaction.vehicle.pricePerDay;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Return</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Process Return</DialogTitle>
                    <DialogDescription>
                        Return vehicle: {transaction.vehicle.name} ({transaction.vehicle.licensePlate})
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <input type="hidden" name="transactionId" value={transaction.id} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="returnDate" className="text-right">
                                Return Date
                            </Label>
                            <Input
                                id="returnDate"
                                name="returnDate"
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Price Est.</Label>
                            <div className="col-span-3 font-medium">
                                Rp {estimatedPrice.toLocaleString()} ({diffDays} days)
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fine" className="text-right">
                                Fine (Denda)
                            </Label>
                            <Input
                                id="fine"
                                name="fine"
                                type="number"
                                placeholder="0"
                                className="col-span-3"
                                defaultValue={0}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Confirm Return</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
