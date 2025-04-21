
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSheetDB } from "@/hooks/useSheetDB";
import { toast } from "sonner";

interface CustomerFormProps {
  onCustomerAdded?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onCustomerAdded }) => {
  const { createRecord, loading } = useSheetDB();
  
  const [customer, setCustomer] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await createRecord(customer, { sheet: 'Customers' });
      
      if (result.created) {
        toast.success("Customer added successfully!");
        toast.info(`Customer ID: ${result.data?.CustomerID || 'Generated'}`);
        
        setCustomer({
          Name: "",
          Email: "",
          Phone: "",
          Address: ""
        });
        
        if (onCustomerAdded) {
          onCustomerAdded();
        }
      } else {
        toast.error("Failed to add customer");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="customer-form">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Name">Full Name*</Label>
              <Input
                id="Name"
                name="Name"
                value={customer.Name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Email">Email Address*</Label>
              <Input
                id="Email"
                type="email"
                name="Email"
                value={customer.Email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Phone">Phone Number*</Label>
              <Input
                id="Phone"
                name="Phone"
                value={customer.Phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Address">Address</Label>
              <Textarea
                id="Address"
                name="Address"
                value={customer.Address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          type="submit"
          form="customer-form"
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Saving..." : "Add Customer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerForm;
