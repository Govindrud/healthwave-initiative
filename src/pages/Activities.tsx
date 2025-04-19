
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import AdventureListing from "@/components/adventures/AdventureListing";
import GameListing from "@/components/games/GameListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Activities = () => {
  useEffect(() => {
    document.title = "MeantToHelp | Mental Wellness Activities";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Mental Wellness Activities">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Mental Wellness Activities</h1>
            <p className="text-muted-foreground">
              Explore our range of activities designed to improve mental wellbeing
              and reduce stress through engaging experiences.
            </p>
          </div>
          
          <Tabs defaultValue="adventures">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="adventures">Stress-Free Adventures</TabsTrigger>
              <TabsTrigger value="games">Mental Health Games</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adventures">
              <AdventureListing />
            </TabsContent>
            
            <TabsContent value="games">
              <GameListing />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Activities;
