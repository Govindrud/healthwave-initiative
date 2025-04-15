
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Download } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const paymentId = searchParams.get("payment_id") || "";
  const title = searchParams.get("title") || "Your service";
  const amount = searchParams.get("amount") || "0";

  useEffect(() => {
    document.title = "MeantToHelp | Payment Successful";
  }, []);

  // Format the current date for receipt
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <MainLayout title="Payment Successful">
      <div className="max-w-3xl mx-auto p-4">
        <Card className="p-6 shadow-md">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-green-700">Payment Successful!</h2>
            <p className="text-muted-foreground mt-2">
              Your booking has been confirmed and you will receive an email with all details shortly.
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-4">Receipt Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{paymentId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{title}</span>
              </div>
              
              <div className="flex justify-between pt-3 border-t">
                <span className="font-medium">Total Amount:</span>
                <span className="font-medium text-lg">₹{amount}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex gap-2"
              onClick={() => {
                // In a real app, this would generate and download a PDF receipt
                alert("Receipt download functionality would be implemented in a production environment");
              }}
            >
              <Download size={18} />
              Download Receipt
            </Button>
            
            <Button 
              className="bg-meant-600 hover:bg-meant-700 text-white"
              asChild
            >
              <Link to="/spirituality">
                Explore More Services
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccess;
