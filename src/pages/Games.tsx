
import { useEffect } from "react";
import GameListing from "@/components/games/GameListing";
import MainLayout from "@/components/layouts/MainLayout";

const Games = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Mental Health Games & Activities";
  }, []);

  return (
    <MainLayout title="Mental Health Games & Activities">
      <GameListing />
    </MainLayout>
  );
};

export default Games;
