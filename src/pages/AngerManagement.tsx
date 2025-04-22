
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Angry } from "lucide-react";

const angerTips = [
  {
    title: "Recognize Triggers",
    icon: <Angry className="text-[#9b87f5] w-8 h-8 mb-2" />,
    description: "Understand what situations, people, or thoughts cause you to feel angry. Awareness is the first step."
  },
  {
    title: "Practice Deep Breathing",
    icon: <Smile className="text-[#1EAEDB] w-8 h-8 mb-2" />,
    description: "Pause and take slow, deep breaths. Deep breathing calms your nervous system during moments of anger."
  },
  {
    title: "Use Healthy Outlets",
    icon: <Smile className="text-[#7E69AB] w-8 h-8 mb-2" />,
    description: "Channel anger through physical activity or creative tasks such as drawing, writing, or exercise."
  },
  {
    title: "Communicate Assertively",
    icon: <Smile className="text-[#1A1F2C] w-8 h-8 mb-2" />,
    description: "Express your feelings calmly and clearly, without blame or aggression."
  },
];

const AngerManagement: React.FC = () => {
  return (
    <Layout>
      <div className="service-header flex flex-col items-center justify-center">
        <h1 className="service-title text-4xl font-bold mb-2 text-center">Anger Management</h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto text-center">
          Everyone experiences anger—it's a natural emotion. However, how you manage your anger can make a significant difference in your well-being and relationships. Here are some practical strategies to manage and transform anger in a healthy way.
        </p>
      </div>
      <div className="container mx-auto my-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {angerTips.map((tip) => (
          <Card key={tip.title} className="service-card h-full flex flex-col items-center text-center">
            <CardHeader>
              {tip.icon}
              <CardTitle className="text-lg">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col items-center my-10">
        <h2 className="text-2xl font-semibold mb-3 text-[#9b87f5]">Helpful Resources</h2>
        <ul className="mb-6 space-y-2">
          <li>
            <a
              href="https://www.apa.org/topics/anger/control"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline story-link"
            >
              APA: Controlling Anger Before It Controls You
            </a>
          </li>
          <li>
            <a
              href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/anger/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline story-link"
            >
              Mind.org: Understanding and Managing Anger
            </a>
          </li>
        </ul>
        <Button variant="meant" size="lg" asChild>
          <a href="/doctors">Seek Professional Support</a>
        </Button>
      </div>
    </Layout>
  );
};

export default AngerManagement;

