
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Download, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const paymentId = searchParams.get("payment_id") || "";
  const title = searchParams.get("title") || "Your service";
  const amount = searchParams.get("amount") || "0";
  const serviceType = searchParams.get("service_type") || "";

  useEffect(() => {
    document.title = "MeantToHelp | Payment Successful";
    
    // Log successful payment details
    console.log("Payment success page loaded with params:", {
      orderId,
      paymentId,
      title,
      amount,
      serviceType
    });
    
    // Show success toast on page load
    if (paymentId) {
      toast.success("Payment completed successfully!");
    }
  }, [orderId, paymentId, title, amount, serviceType]);

  // Format the current date for receipt
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    toast.info("Receipt download functionality would be implemented in a production environment");
    
    // Create a simple text receipt for demo purposes
    const receiptText = `
      Receipt
      -------
      Order ID: ${orderId}
      Payment ID: ${paymentId}
      Date: ${currentDate}
      Service: ${title}
      Amount: ₹${amount}
      
      Thank you for your payment!
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getServiceDescription = () => {
    switch(serviceType) {
      case "voice_therapy":
        return "Our team will contact you within 24 hours to schedule your voice therapy session.";
      case "assessment":
        return "We will send your personalized assessment link to your email within 24 hours.";
      case "corporate":
        return "Our corporate wellness team will reach out to discuss implementation details.";
      case "matching":
        return "You will receive therapist recommendations within 48 hours.";
      case "ai_assistant":
        return "Your AI assistant access has been activated. Check your email for login details.";
      default:
        return "Our team will contact you soon with next steps.";
    }
  };

  return (
    <MainLayout title="Payment Successful">
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-green-100 bg-green-50 p-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-green-800 mb-2">Payment Successful!</h1>
            <p className="text-green-700 mb-6">Thank you for your purchase.</p>
            
            <div className="w-full bg-white rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{paymentId}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{title}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium text-lg">₹{amount}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <p className="text-sm text-muted-foreground">
                  {getServiceDescription()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 mb-8">
              <Button onClick={handleDownloadReceipt} variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                View Bookings
              </Button>
            </div>
            
            <Link to="/services">
              <Button variant="ghost" className="flex items-center text-meant-600 hover:text-meant-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccess;
