
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameListing from "@/components/games/GameListing";
import PageTransition from "@/components/PageTransition";

const Games = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Mental Health Games & Activities";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <GameListing />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Games;
