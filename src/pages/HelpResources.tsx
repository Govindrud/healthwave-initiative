
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { 
  Phone, Heart, Book, BookOpen, Handshake, Brain, 
  Headphones, Globe, Clock, Users, Building, Target 
} from "lucide-react";

const HelpResources = () => {
  return (
    <MainLayout title="Help Resources | MeantToHelp">
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50 dark:from-background dark:to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block p-2 bg-meant-100 dark:bg-meant-900/30 rounded-full mb-4">
              <Heart className="h-8 w-8 text-meant-600 dark:text-meant-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-meant-800 dark:text-white">
              Support Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Access a comprehensive collection of mental health and crisis support resources. Help is always available.
            </p>
          </div>

          {/* Emergency help banner */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-12 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-full">
                <Phone className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">
                  Need immediate help?
                </h2>
                <p className="text-red-700 dark:text-red-400 mb-4">
                  If you or someone you know is in crisis, please call the National Suicide Prevention Lifeline.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:1800-273-8255">
                    <Button variant="destructive" size="lg" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      1-800-273-8255
                    </Button>
                  </a>
                  <a href="sms:741741">
                    <Button variant="outline" className="border-red-300 dark:border-red-800 text-red-700 dark:text-red-400">
                      Text "HOME" to 741741
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="crisis" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="crisis">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard 
                  title="National Suicide Prevention Lifeline"
                  description="24/7, free and confidential support for people in distress."
                  contact="1-800-273-8255"
                  icon={<Phone className="h-8 w-8" />}
                  url="https://suicidepreventionlifeline.org"
                />
                <ResourceCard 
                  title="Crisis Text Line"
                  description="Text HOME to 741741 to connect with a Crisis Counselor."
                  contact="Text HOME to 741741"
                  icon={<Headphones className="h-8 w-8" />}
                  url="https://www.crisistextline.org"
                />
                <ResourceCard 
                  title="Veterans Crisis Line"
                  description="Connect with the Veterans Crisis Line to reach caring, qualified responders."
                  contact="1-800-273-8255 (Press 1)"
                  icon={<Handshake className="h-8 w-8" />}
                  url="https://www.veteranscrisisline.net"
                />
                <ResourceCard 
                  title="Disaster Distress Helpline"
                  description="Crisis support for people experiencing emotional distress related to disasters."
                  contact="1-800-985-5990"
                  icon={<Brain className="h-8 w-8" />}
                  url="https://www.samhsa.gov/find-help/disaster-distress-helpline"
                />
                <ResourceCard 
                  title="SAMHSA's National Helpline"
                  description="Treatment referral and information service for individuals facing mental health disorders."
                  contact="1-800-662-HELP (4357)"
                  icon={<BookOpen className="h-8 w-8" />}
                  url="https://www.samhsa.gov/find-help/national-helpline"
                />
                <ResourceCard 
                  title="National Domestic Violence Hotline"
                  description="Support for victims and survivors of domestic violence."
                  contact="1-800-799-SAFE (7233)"
                  icon={<Heart className="h-8 w-8" />}
                  url="https://www.thehotline.org"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard 
                  title="MentalHealth.gov"
                  description="Information and resources on mental health for individuals, families, and professionals."
                  contact="Visit Website"
                  icon={<Globe className="h-8 w-8" />}
                  url="https://www.mentalhealth.gov"
                />
                <ResourceCard 
                  title="National Alliance on Mental Illness"
                  description="Advocacy, education, support and public awareness for individuals affected by mental illness."
                  contact="1-800-950-NAMI (6264)"
                  icon={<Users className="h-8 w-8" />}
                  url="https://www.nami.org"
                />
                <ResourceCard 
                  title="Psychology Today Find a Therapist"
                  description="Directory to find therapists, psychiatrists, treatment centers, and support groups."
                  contact="Visit Website"
                  icon={<Book className="h-8 w-8" />}
                  url="https://www.psychologytoday.com/us/therapists"
                />
                <ResourceCard 
                  title="Mindfulness Resources"
                  description="Learn about mindfulness practices to reduce stress and anxiety."
                  contact="Visit Website"
                  icon={<Brain className="h-8 w-8" />}
                  url="/spirituality"
                />
                <ResourceCard 
                  title="Self-Care Activities"
                  description="Discover activities to promote mental wellness and emotional balance."
                  contact="Visit Website"
                  icon={<Heart className="h-8 w-8" />}
                  url="/adventures"
                />
                <ResourceCard 
                  title="De-Addiction Support"
                  description="Resources for addiction recovery and support."
                  contact="Visit Website"
                  icon={<Target className="h-8 w-8" />}
                  url="/de-addiction"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="organizations">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard 
                  title="American Psychological Association"
                  description="Professional organization representing psychologists in the United States."
                  contact="Visit Website"
                  icon={<Building className="h-8 w-8" />}
                  url="https://www.apa.org"
                />
                <ResourceCard 
                  title="Mental Health America"
                  description="Nation's leading community-based nonprofit dedicated to addressing the needs of those living with mental illness."
                  contact="Visit Website"
                  icon={<Users className="h-8 w-8" />}
                  url="https://www.mhanational.org"
                />
                <ResourceCard 
                  title="Anxiety and Depression Association of America"
                  description="Provides resources on anxiety, depression, and related disorders."
                  contact="Visit Website"
                  icon={<Brain className="h-8 w-8" />}
                  url="https://adaa.org"
                />
                <ResourceCard 
                  title="National Institute of Mental Health"
                  description="Federal agency for research on mental disorders."
                  contact="Visit Website"
                  icon={<Book className="h-8 w-8" />}
                  url="https://www.nimh.nih.gov"
                />
                <ResourceCard 
                  title="World Health Organization - Mental Health"
                  description="Global resources and information on mental health."
                  contact="Visit Website"
                  icon={<Globe className="h-8 w-8" />}
                  url="https://www.who.int/health-topics/mental-health"
                />
                <ResourceCard 
                  title="MeantToHelp Services"
                  description="Our professional mental health services and resources."
                  contact="Contact Us"
                  icon={<Heart className="h-8 w-8" />}
                  url="/services"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  contact: string;
  icon: React.ReactNode;
  url: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  contact, 
  icon,
  url
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 bg-meant-100 dark:bg-meant-900/30 rounded-full">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-2">{description}</CardDescription>
        <div className="font-medium text-meant-700 dark:text-meant-300 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>24/7 Support: {contact}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <a href={url} target={url.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
            Visit Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HelpResources;
