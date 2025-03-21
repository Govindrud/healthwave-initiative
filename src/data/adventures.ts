
export interface Adventure {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
  location: string;
  date: string;
  duration: string;
  groupSize: string;
  price: number;
  included: string[];
  highlights: string[];
  requirementLevel: string;
}

export const adventures: Adventure[] = [
  {
    id: 1,
    title: "Weekend Himalayan Trek",
    type: "Hiking",
    description: "Escape the city and reconnect with nature on this rejuvenating trek through scenic Himalayan trails, perfect for beginners seeking peace and fresh mountain air.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    location: "Dehradun, Uttarakhand",
    date: "Every Weekend",
    duration: "2 Days, 1 Night",
    groupSize: "6-12 people",
    price: 4500,
    included: ["Professional guides", "Accommodation", "Meals", "Transportation from meeting point", "Safety equipment"],
    highlights: ["Stunning mountain views", "Guided mindfulness sessions", "Stargazing", "Campfire stories", "Nature photography opportunities"],
    requirementLevel: "Beginner-Friendly"
  },
  {
    id: 2,
    title: "Riverside Meditation Retreat",
    type: "Retreat",
    description: "A peaceful weekend by the Ganges focusing on meditation, yoga, and mindfulness practices to reduce anxiety and restore inner calm.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Rishikesh, Uttarakhand",
    date: "Monthly (First Weekend)",
    duration: "3 Days, 2 Nights",
    groupSize: "10-15 people",
    price: 7500,
    included: ["Ashram accommodation", "Vegetarian meals", "Yoga sessions", "Meditation guidance", "Spiritual talks"],
    highlights: ["Sunrise yoga", "Guided meditation by the Ganges", "Silent nature walks", "Sound healing", "Vegetarian cooking workshop"],
    requirementLevel: "All Levels"
  },
  {
    id: 3,
    title: "Western Ghats Cycling Tour",
    type: "Cycling",
    description: "Pedal through the lush Western Ghats, exploring charming villages and breathtaking landscapes while enjoying the therapeutic benefits of cycling in nature.",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Coorg, Karnataka",
    date: "Sep-Feb (Weekends)",
    duration: "2 Days, 1 Night",
    groupSize: "6-10 people",
    price: 5800,
    included: ["Bicycle and helmet", "Support vehicle", "Accommodation", "Meals", "First-aid support"],
    highlights: ["Scenic countryside routes", "Coffee plantation visit", "Waterfall stop", "Local cuisine tasting", "Breathing exercises"],
    requirementLevel: "Moderate Fitness Required"
  },
  {
    id: 4,
    title: "Desert Stargazing Camp",
    type: "Camping",
    description: "Experience the tranquility of the desert under a blanket of stars. This overnight camping trip combines astronomy, meditation, and the healing silence of the desert.",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Jaisalmer, Rajasthan",
    date: "Oct-Mar (Full Moon Weekends)",
    duration: "2 Days, 1 Night",
    groupSize: "8-15 people",
    price: 4200,
    included: ["Desert camp accommodation", "All meals", "Camel safari", "Astronomy guide", "Traditional entertainment"],
    highlights: ["Guided stargazing", "Desert meditation", "Sunrise yoga", "Traditional Rajasthani dinner", "Folk music around campfire"],
    requirementLevel: "Beginner-Friendly"
  },
  {
    id: 5,
    title: "Coastal Wellness Weekend",
    type: "Retreat",
    description: "Rejuvenate by the Arabian Sea with a blend of yoga, meditation, beach walks, and nutritious food designed to de-stress and rebalance your mind and body.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    location: "Gokarna, Karnataka",
    date: "Year-round (Monthly)",
    duration: "3 Days, 2 Nights",
    groupSize: "8-12 people",
    price: 9800,
    included: ["Beach resort stay", "Vegetarian/vegan meals", "Yoga sessions", "Beach activities", "Wellness workshops"],
    highlights: ["Beach yoga", "Sunset meditation", "Ocean breathing techniques", "Ayurvedic cooking demo", "Beach cleanup activity"],
    requirementLevel: "All Levels"
  },
  {
    id: 6,
    title: "Forest Bathing Experience",
    type: "Forest Therapy",
    description: "Practice the Japanese art of Shinrin-Yoku (forest bathing) in the ancient forests of Kerala. A guided sensory experience that reduces stress and boosts immunity.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: "Wayanad, Kerala",
    date: "Year-round (Weekends)",
    duration: "Full Day Experience",
    groupSize: "4-8 people",
    price: 3500,
    included: ["Certified forest therapy guide", "Organic lunch", "Herbal tea ceremony", "Transportation from meeting point"],
    highlights: ["Guided sensory walks", "Mindful forest meditation", "Wildlife spotting", "Picnic by a stream", "Nature journaling"],
    requirementLevel: "Beginner-Friendly"
  }
];
