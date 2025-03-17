
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    document.title = "Page Not Found | MeantToHelp";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent to-background p-4">
      <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-meant-100 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-meant-600" size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
          404
        </h1>
        <p className="text-xl text-foreground/80 mb-6">
          We couldn't find the page you're looking for.
        </p>
        <p className="text-muted-foreground mb-8">
          The page might have been moved, deleted, or possibly never existed.
        </p>
        <Button
          asChild
          className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-8"
        >
          <Link to="/" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
