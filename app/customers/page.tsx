export const dynamic = "force-dynamic";

import { getCustomers, deleteCustomer } from "@/app/actions/customers";
import { AddCustomerDialog } from "@/components/AddCustomerDialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function CustomersPage() {
    let customers: any[] = [];
    try {
        customers = await getCustomers();
    } catch (e) {
        console.error("Failed to fetch customers:", e);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <AddCustomerDialog />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer: any) => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>{customer.nik}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell className="max-w-[200px] truncate">{customer.address}</TableCell>
                                <TableCell className="text-right">
                                    <form action={async () => {
                                        "use server"
                                        await deleteCustomer(customer.id)
                                    }}>
                                        <Button variant="ghost" size="sm" type="submit" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                            Delete
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                        {customers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No customers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
