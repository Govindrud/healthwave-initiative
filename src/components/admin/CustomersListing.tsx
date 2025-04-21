
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, Pencil, Trash2 } from "lucide-react";
import { useSheetDB } from "@/hooks/useSheetDB";
import { toast } from "sonner";

const CustomersListing: React.FC = () => {
  const { getRecords, deleteRecord, loading } = useSheetDB();
  const [customers, setCustomers] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch customers on component mount
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setIsRefreshing(true);
    try {
      const data = await getRecords({ sheet: 'Customers' });
      setCustomers(data);
    } catch (error) {
      console.error("Failed to load customers", error);
      toast.error("Failed to load customers");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (customerId: string) => {
    if (confirm("Are you sure you want to delete this customer? This cannot be undone.")) {
      try {
        const result = await deleteRecord(customerId, { sheet: 'Customers' });
        if (result.deleted) {
          toast.success("Customer deleted successfully");
          loadCustomers(); // Refresh the list
        } else {
          toast.error("Failed to delete customer");
        }
      } catch (error) {
        console.error("Error deleting customer", error);
        toast.error("An error occurred while deleting customer");
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customers</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadCustomers}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading && !customers.length ? (
          <div className="py-4 text-center">Loading customers...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <TableRow key={customer.CustomerID}>
                      <TableCell className="font-medium">{customer.CustomerID}</TableCell>
                      <TableCell>{customer.Name}</TableCell>
                      <TableCell>{customer.Email}</TableCell>
                      <TableCell>{customer.Phone}</TableCell>
                      <TableCell>{customer.CreatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(customer.CustomerID)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      {isRefreshing ? "Loading data..." : "No customers found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomersListing;
