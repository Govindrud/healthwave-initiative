
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string; // Make title optional
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default MainLayout;
