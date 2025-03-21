
export interface Webinar {
  id: number;
  title: string;
  presenter: string;
  presenterCredentials: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  image: string;
  tags: string[];
  attendees: number;
  recordingAvailable?: boolean;
}

export const webinars: Webinar[] = [
  {
    id: 1,
    title: "Managing Workplace Anxiety in a Post-Pandemic World",
    presenter: "Dr. Rajat Verma",
    presenterCredentials: "MD, Fellowship in Workplace Psychology",
    date: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
    time: "6:00 PM IST",
    duration: "60 minutes",
    description: "Learn practical strategies to manage workplace anxiety as we navigate new work environments. This webinar will cover recognizing anxiety triggers, effective coping techniques, and how to create a healthy work-life balance.",
    image: "https://images.unsplash.com/photo-1565551423166-366d7f1bfd1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Workplace Mental Health", "Anxiety", "Stress Management"],
    attendees: 156
  },
  {
    id: 2,
    title: "Mindfulness Techniques for Busy Professionals",
    presenter: "Sarika Desai",
    presenterCredentials: "MA Clinical Psychology, Certified Mindfulness Instructor",
    date: new Date(Date.now() + 14*24*60*60*1000).toISOString(),
    time: "7:30 PM IST",
    duration: "45 minutes",
    description: "Discover how to incorporate mindfulness into your busy schedule. This session will introduce quick mindfulness exercises that can be practiced throughout the workday to reduce stress and improve focus.",
    image: "https://images.unsplash.com/photo-1545205784-1e73aa8424ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Mindfulness", "Meditation", "Work-Life Balance"],
    attendees: 89
  },
  {
    id: 3,
    title: "Understanding and Supporting Children's Mental Health",
    presenter: "Dr. Arjun Sharma",
    presenterCredentials: "MD Psychiatry, Child Mental Health Specialist",
    date: new Date(Date.now() + 21*24*60*60*1000).toISOString(),
    time: "5:00 PM IST",
    duration: "75 minutes",
    description: "This webinar aims to help parents and caregivers recognize signs of mental health challenges in children and learn effective ways to provide support. We'll discuss common issues like anxiety, depression, and behavioral problems in children and adolescents.",
    image: "https://images.unsplash.com/photo-1586307078048-b446162c3b3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
    tags: ["Child Psychology", "Parenting", "Youth Mental Health"],
    attendees: 203
  },
  {
    id: 4,
    title: "Digital Detox: Healthy Relationships with Technology",
    presenter: "Vikram Malhotra",
    presenterCredentials: "Addiction Specialist, Digital Wellness Coach",
    date: new Date(Date.now() - 30*24*60*60*1000).toISOString(),
    time: "6:30 PM IST",
    duration: "60 minutes",
    description: "Explore the impact of technology on our mental health and learn strategies for maintaining a healthy relationship with digital devices. This webinar covers signs of technology addiction, creating healthy boundaries, and techniques for mindful technology use.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Digital Wellness", "Technology", "Mindful Living"],
    attendees: 178,
    recordingAvailable: true
  },
  {
    id: 5,
    title: "Sleep and Mental Health: Improving Your Sleep Hygiene",
    presenter: "Dr. Priya Patel",
    presenterCredentials: "Clinical Psychologist, Sleep Specialist",
    date: new Date(Date.now() - 60*24*60*60*1000).toISOString(),
    time: "7:00 PM IST",
    duration: "60 minutes",
    description: "Understand the critical relationship between sleep and mental health. This webinar provides insights into how sleep affects mood and cognitive function, along with practical tips for improving sleep quality and establishing healthy sleep routines.",
    image: "https://images.unsplash.com/photo-1631157826893-ec111bbd9e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2572&q=80",
    tags: ["Sleep", "Insomnia", "Mental Wellbeing"],
    attendees: 145,
    recordingAvailable: true
  },
  {
    id: 6,
    title: "Navigating Grief and Loss in Challenging Times",
    presenter: "Anjali Khanna",
    presenterCredentials: "Geriatric Psychiatrist, Grief Counselor",
    date: new Date(Date.now() - 90*24*60*60*1000).toISOString(),
    time: "5:30 PM IST",
    duration: "75 minutes",
    description: "This compassionate webinar addresses different forms of grief and loss, including death of loved ones, job loss, or life transitions. Learn about the grieving process, cultural perspectives on grief, and healthy coping strategies for healing and moving forward.",
    image: "https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    tags: ["Grief", "Loss", "Emotional Support"],
    attendees: 198,
    recordingAvailable: false
  }
];
