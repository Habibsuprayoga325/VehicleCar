"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteVehicle } from "@/app/actions/vehicles";
import { Trash2 } from "lucide-react";

interface DeleteVehicleButtonProps {
    vehicleId: number;
}

export function DeleteVehicleButton({ vehicleId }: DeleteVehicleButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this vehicle?")) return;

        setIsDeleting(true);
        try {
            await deleteVehicle(vehicleId);
        } catch (error: any) {
            alert(error.message); // Show the error message (e.g., "Cannot delete...")
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
            <Trash2 className="h-4 w-4 mr-1" />
            {isDeleting ? "Deleting..." : "Delete"}
        </Button>
    );
}
