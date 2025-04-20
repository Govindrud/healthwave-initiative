
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PracticeCardProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const PracticeCard = ({ title, description, imageSrc }: PracticeCardProps) => (
  <Card className="h-full hover:shadow-lg transition-shadow">
    {imageSrc && (
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
    <CardContent className="p-6">
      <h3 className="text-xl font-medium text-meant-800 mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export const CoreBhaktiPractices: React.FC = () => {
  const practices = [
    {
      title: "Kirtan (Devotional Chanting)",
      description: "Experience the joy of sacred sound through traditional call-and-response chanting.",
      imageSrc: "https://images.unsplash.com/photo-1473177104440-ffee2f376098"
    },
    {
      title: "Japa Meditation",
      description: "Learn the practice of mantra repetition using prayer beads to focus the mind.",
      imageSrc: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
    },
    {
      title: "Seva (Selfless Service)",
      description: "Discover how acts of service can become spiritual practice and expression of devotion.",
      imageSrc: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e"
    },
    {
      title: "Satsang (Spiritual Community)",
      description: "Join like-minded seekers for group study, discussion, and practice.",
      imageSrc: "https://images.unsplash.com/photo-1551038247-3d9af20df552"
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">Core Bhakti Practices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practices.map((practice, index) => (
          <PracticeCard key={index} {...practice} />
        ))}
      </div>
    </section>
  );
};
