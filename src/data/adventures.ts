
export interface Adventure {
  id: number;
  title: string;
  image: string;
  type: string;
  location: string;
  description: string;
  date: string;
  duration: string;
  groupSize: string;
  price: number;
}

export const adventures: Adventure[] = [
  {
    id: 1,
    title: "Mindful Mountain Hiking",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    type: "Hiking",
    location: "Himachal Pradesh",
    description: "Experience the therapeutic benefits of nature through guided mindful hiking in the serene mountains. Connect with yourself while enjoying breathtaking views.",
    date: "Every Weekend",
    duration: "2 Days",
    groupSize: "8-12 people",
    price: 3500
  },
  {
    id: 2,
    title: "Forest Therapy Walk",
    image: "https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    type: "Forest Therapy",
    location: "Coorg, Karnataka",
    description: "Immerse yourself in the healing power of forests through guided forest bathing sessions. Reduce stress and anxiety naturally.",
    date: "Saturdays",
    duration: "4 Hours",
    groupSize: "6-10 people",
    price: 1200
  },
  {
    id: 3,
    title: "Wellness Camping Retreat",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    type: "Camping",
    location: "Rishikesh, Uttarakhand",
    description: "Disconnect from digital distractions and reconnect with nature through our wellness camping experience. Includes meditation sessions and yoga.",
    date: "Monthly",
    duration: "3 Days",
    groupSize: "10-15 people",
    price: 5500
  },
  {
    id: 4,
    title: "Cycling Meditation Tour",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    type: "Cycling",
    location: "Goa",
    description: "Combine gentle cycling with mindfulness practices. Explore scenic routes while practicing moving meditation techniques.",
    date: "Bi-Weekly",
    duration: "5 Hours",
    groupSize: "8-12 people",
    price: 2200
  },
  {
    id: 5,
    title: "Sunrise Yoga Retreat",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    type: "Retreat",
    location: "Kerala Backwaters",
    description: "Start your day with peaceful sunrise yoga sessions by the backwaters. Includes healthy meals and wellness workshops.",
    date: "Weekends",
    duration: "2 Days",
    groupSize: "12-20 people",
    price: 4200
  },
  {
    id: 6,
    title: "Desert Mindfulness Expedition",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    type: "Hiking",
    location: "Rajasthan Desert",
    description: "Experience the vastness and silence of the desert through guided meditation and stargazing sessions. Perfect for deep introspection.",
    date: "Monthly",
    duration: "2 Days",
    groupSize: "6-10 people",
    price: 6500
  }
];
