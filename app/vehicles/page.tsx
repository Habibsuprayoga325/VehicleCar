export const dynamic = "force-dynamic";

import { getVehicles, deleteVehicle } from "@/app/actions/vehicles";
import { AddVehicleDialog } from "@/components/AddVehicleDialog";
import { EditVehicleDialog } from "@/components/EditVehicleDialog";
import { DeleteVehicleButton } from "@/components/DeleteVehicleButton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function VehiclesPage() {
    let vehicles: any[] = [];
    try {
        vehicles = await getVehicles();
    } catch (e) {
        console.error("Failed to fetch vehicles:", e);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>
                <AddVehicleDialog />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>License Plate</TableHead>
                            <TableHead>Price/Day</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((vehicle: any) => (
                            <TableRow key={vehicle.id}>
                                <TableCell className="font-medium">{vehicle.name}</TableCell>
                                <TableCell>{vehicle.type}</TableCell>
                                <TableCell>{vehicle.licensePlate}</TableCell>
                                <TableCell>
                                    Rp {vehicle.pricePerDay.toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={vehicle.isAvailable ? "default" : "destructive"}>
                                        {vehicle.isAvailable ? "Available" : "Rented"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end items-center gap-2">
                                        <EditVehicleDialog vehicle={vehicle} />
                                        <DeleteVehicleButton vehicleId={vehicle.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {vehicles.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No vehicles found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
