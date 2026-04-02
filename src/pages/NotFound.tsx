
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertCircle, Home, Search } from "lucide-react";
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
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center max-w-md mx-auto shadow-lg">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-primary" size={40} />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-2 text-primary">
          404
        </h1>
        <p className="text-xl text-foreground mb-2">
          Page not found
        </p>
        <p className="text-muted-foreground mb-8">
          The page <code className="bg-muted px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full px-6">
            <Link to="/" className="flex items-center">
              <Home size={16} className="mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/services" className="flex items-center">
              <Search size={16} className="mr-2" />
              Browse Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
