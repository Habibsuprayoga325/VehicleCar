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
import { updateVehicle } from "@/app/actions/vehicles";
import { Pencil } from "lucide-react";

interface EditVehicleDialogProps {
    vehicle: {
        id: number;
        name: string;
        type: string;
        licensePlate: string;
        pricePerDay: number;
    };
}

export function EditVehicleDialog({ vehicle }: EditVehicleDialogProps) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        await updateVehicle(vehicle.id, formData);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mr-2">
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Vehicle</DialogTitle>
                    <DialogDescription>
                        Update vehicle details.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={vehicle.name}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <div className="col-span-3">
                                <Select name="type" defaultValue={vehicle.type} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BUS">Bus</SelectItem>
                                        <SelectItem value="MINIBUS">Minibus</SelectItem>
                                        <SelectItem value="MOTOR">Motor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="licensePlate" className="text-right">
                                Plate
                            </Label>
                            <Input
                                id="licensePlate"
                                name="licensePlate"
                                defaultValue={vehicle.licensePlate}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pricePerDay" className="text-right">
                                Price/Day
                            </Label>
                            <Input
                                id="pricePerDay"
                                name="pricePerDay"
                                type="number"
                                defaultValue={vehicle.pricePerDay}
                                className="col-span-3"
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
