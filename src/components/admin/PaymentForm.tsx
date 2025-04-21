
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSheetDB } from "@/hooks/useSheetDB";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

interface PaymentFormProps {
  onPaymentAdded?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentAdded }) => {
  const { createRecord, loading } = useSheetDB();
  
  const [payment, setPayment] = useState({
    CustomerID: "",
    Amount: "",
    PaymentDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    Method: "UPI",
    Status: "Completed",
    ReceiptURL: ""
  });
  
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setPayment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };
  
  // For now, just simulate a file upload and return a link
  // In a real app, you would upload to Google Drive API or another storage service
  const simulateFileUpload = async () => {
    if (!receiptFile) return "";
    
    setUploadingReceipt(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Just generate a fake Google Drive URL for demonstration
      const fakeGoogleDriveUrl = `https://drive.google.com/file/d/1${Math.random().toString(36).substring(2, 10)}/view`;
      
      toast.success("Receipt uploaded successfully");
      return fakeGoogleDriveUrl;
    } catch (error) {
      toast.error("Failed to upload receipt");
      return "";
    } finally {
      setUploadingReceipt(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // If there's a file selected, simulate upload and get URL
      let receiptURL = payment.ReceiptURL;
      if (receiptFile) {
        receiptURL = await simulateFileUpload();
      }
      
      const paymentData = {
        ...payment,
        ReceiptURL: receiptURL
      };
      
      const result = await createRecord(paymentData, { sheet: 'Payments' });
      
      if (result.created) {
        toast.success("Payment recorded successfully!");
        setPayment({
          CustomerID: "",
          Amount: "",
          PaymentDate: new Date().toISOString().split('T')[0],
          Method: "UPI",
          Status: "Completed",
          ReceiptURL: ""
        });
        setReceiptFile(null);
        
        if (onPaymentAdded) {
          onPaymentAdded();
        }
      } else {
        toast.error("Failed to record payment");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="payment-form">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="CustomerID">Customer ID</Label>
              <Input
                id="CustomerID"
                name="CustomerID"
                value={payment.CustomerID}
                onChange={handleChange}
                placeholder="Enter customer ID"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Amount">Payment Amount</Label>
              <Input
                id="Amount"
                name="Amount"
                type="number"
                value={payment.Amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="PaymentDate">Payment Date</Label>
              <Input
                id="PaymentDate"
                name="PaymentDate"
                type="date"
                value={payment.PaymentDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Method">Payment Method</Label>
              <Select 
                value={payment.Method}
                onValueChange={(value) => handleSelectChange("Method", value)}
              >
                <SelectTrigger id="Method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="Status">Status</Label>
              <Select 
                value={payment.Status}
                onValueChange={(value) => handleSelectChange("Status", value)}
              >
                <SelectTrigger id="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="ReceiptURL">Receipt URL</Label>
              <Input
                id="ReceiptURL"
                name="ReceiptURL"
                value={payment.ReceiptURL}
                onChange={handleChange}
                placeholder="Enter Google Drive link to receipt (optional)"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="receipt">Upload Receipt</Label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                <UploadCloud className="h-6 w-6 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 mb-2">
                  {receiptFile ? receiptFile.name : "Click or drag file to upload receipt"}
                </p>
                <Input
                  id="receipt"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label 
                  htmlFor="receipt" 
                  className="bg-meant-50 hover:bg-meant-100 py-1 px-3 rounded text-sm cursor-pointer"
                >
                  Select File
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                In a real implementation, this would upload to Google Drive and store the URL
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          type="submit"
          form="payment-form"
          disabled={loading || uploadingReceipt}
          className="w-full sm:w-auto"
        >
          {loading || uploadingReceipt ? "Processing..." : "Record Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
