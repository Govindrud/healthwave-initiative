
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layouts/MainLayout";

// Import refactored components
import SpiritualityHero from "@/components/spirituality/SpiritualityHero";
import GurusTab from "@/components/spirituality/GurusTab";
import TravelTab from "@/components/spirituality/TravelTab";
import VideoTab from "@/components/spirituality/VideoTab";
import PlanningTab from "@/components/spirituality/PlanningTab";
import HealthTab from "@/components/spirituality/HealthTab";
import BhaktiYogaTab from "@/components/spirituality/BhaktiYogaTab";
import SpiritualityCTA from "@/components/spirituality/SpiritualityCTA";

const SpiritualityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("gurus");
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["gurus", "travel", "video", "planning", "health", "yoga"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/spirituality-new?tab=${value}`);
  };

  return (
    <MainLayout>
      <SpiritualityHero />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-12">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
          <TabsTrigger value="gurus">Guru Help</TabsTrigger>
          <TabsTrigger value="travel">Spiritual Travel</TabsTrigger>
          <TabsTrigger value="video">Video Consult</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="health">Health Guidance</TabsTrigger>
          <TabsTrigger value="yoga">Bhakti Yoga</TabsTrigger>
        </TabsList>

        <TabsContent value="gurus">
          <GurusTab />
        </TabsContent>

        <TabsContent value="travel">
          <TravelTab />
        </TabsContent>

        <TabsContent value="video">
          <VideoTab />
        </TabsContent>

        <TabsContent value="planning">
          <PlanningTab />
        </TabsContent>

        <TabsContent value="health">
          <HealthTab />
        </TabsContent>

        <TabsContent value="yoga">
          <BhaktiYogaTab />
        </TabsContent>
      </Tabs>
      
      <SpiritualityCTA />
    </MainLayout>
  );
};

export default SpiritualityPage;
