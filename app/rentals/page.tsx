export const dynamic = "force-dynamic";

import { getActiveRentals, getRentalHistory } from "@/app/actions/rentals";
import { getCustomers } from "@/app/actions/customers";
import { getAvailableVehicles } from "@/app/actions/vehicles";
import { NewRentalDialog } from "@/components/NewRentalDialog";
import { ReturnRentalDialog } from "@/components/ReturnRentalDialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function RentalsPage() {
    let activeRentals: any[] = [];
    let historyRentals: any[] = [];
    let customers: any[] = [];
    let availableVehicles: any[] = [];

    try {
        activeRentals = await getActiveRentals();
        historyRentals = await getRentalHistory();
        customers = await getCustomers();
        availableVehicles = await getAvailableVehicles();
    } catch (e) {
        console.error("Failed to fetch rental data:", e);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Rentals</h1>
                <NewRentalDialog customers={customers} vehicles={availableVehicles} />
            </div>

            <Tabs defaultValue="active" className="w-full">
                <TabsList>
                    <TabsTrigger value="active">Active Rentals</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Rentals</CardTitle>
                            <CardDescription>Vehicles currently out on rent.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>Expected Return</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeRentals.map((rental: any) => (
                                        <TableRow key={rental.id}>
                                            <TableCell>
                                                <div className="font-medium">{rental.vehicle.name}</div>
                                                <div className="text-sm text-muted-foreground">{rental.vehicle.licensePlate}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{rental.customer.name}</div>
                                                <div className="text-sm text-muted-foreground">{rental.customer.phone}</div>
                                            </TableCell>
                                            <TableCell>{rental.startDate.toLocaleDateString()}</TableCell>
                                            <TableCell>{rental.endDate.toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                    {rental.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <ReturnRentalDialog transaction={rental} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {activeRentals.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No active rentals.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rental History</CardTitle>
                            <CardDescription>All past and current transactions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Date Range</TableHead>
                                        <TableHead>Total Price</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {historyRentals.map((rental: any) => (
                                        <TableRow key={rental.id}>
                                            <TableCell className="font-mono">#{rental.id}</TableCell>
                                            <TableCell>{rental.vehicle.name}</TableCell>
                                            <TableCell>{rental.customer.name}</TableCell>
                                            <TableCell>
                                                {rental.startDate.toLocaleDateString()} - {rental.returnDate ? rental.returnDate.toLocaleDateString() : '...'}
                                            </TableCell>
                                            <TableCell>
                                                {rental.status === 'RETURNED' ?
                                                    `Rp ${(rental.totalPrice + rental.fine).toLocaleString()} (Fine: ${rental.fine})`
                                                    : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={rental.status === 'RETURNED' ? 'secondary' : 'outline'}>
                                                    {rental.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
