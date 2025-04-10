
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CertifiedCompaniesSlider } from "./CertifiedCompaniesSlider";

export const CompaniesSection = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
            Certified Stress-Free Organizations
          </h2>
          <p className="text-muted-foreground mb-6">
            These organizations have been recognized for their outstanding commitment to employee wellness.
          </p>
          
          <Tabs 
            defaultValue="all" 
            className="w-full" 
            onValueChange={value => setCurrentCategory(value)}
          >
            <div className="flex justify-center mb-6 overflow-x-auto">
              <TabsList className="bg-meant-50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <CertifiedCompaniesSlider category="all" />
            </TabsContent>
            <TabsContent value="tech" className="mt-0">
              <CertifiedCompaniesSlider category="tech" />
            </TabsContent>
            <TabsContent value="healthcare" className="mt-0">
              <CertifiedCompaniesSlider category="healthcare" />
            </TabsContent>
            <TabsContent value="finance" className="mt-0">
              <CertifiedCompaniesSlider category="finance" />
            </TabsContent>
            <TabsContent value="education" className="mt-0">
              <CertifiedCompaniesSlider category="education" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
