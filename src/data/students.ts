
export interface StudentPsychologist {
  id: number;
  name: string;
  image: string;
  university: string;
  yearOfStudy: string;
  specialInterests: string[];
  location: string;
  availability: string;
  sessionFee: number;
  supervisor: string;
}

export const studentPsychologists: StudentPsychologist[] = [
  {
    id: 1,
    name: "Aryan Kapoor",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    university: "TISS Mumbai",
    yearOfStudy: "Final Year M.A. Clinical Psychology",
    specialInterests: ["Anxiety", "Depression", "Student Counseling"],
    location: "Mumbai, Maharashtra",
    availability: "Evenings and Weekends",
    sessionFee: 500,
    supervisor: "Priya Patel"
  },
  {
    id: 2,
    name: "Meera Reddy",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
    university: "NIMHANS Bangalore",
    yearOfStudy: "M.Phil Clinical Psychology",
    specialInterests: ["Adolescent Issues", "Self-esteem", "Relationship Counseling"],
    location: "Bangalore, Karnataka",
    availability: "Afternoons and Weekends",
    sessionFee: 600,
    supervisor: "Rajat Verma"
  },
  {
    id: 3,
    name: "Vikrant Singh",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    university: "Delhi University",
    yearOfStudy: "Final Year M.A. Counseling Psychology",
    specialInterests: ["Stress Management", "Mindfulness", "Academic Stress"],
    location: "Delhi NCR",
    availability: "Mornings and Evenings",
    sessionFee: 450,
    supervisor: "Arjun Sharma"
  },
  {
    id: 4,
    name: "Zara Ahmed",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2576&q=80",
    university: "Christ University, Bangalore",
    yearOfStudy: "M.Sc Clinical Psychology",
    specialInterests: ["Body Image Issues", "LGBTQ+ Support", "Identity Development"],
    location: "Bangalore, Karnataka",
    availability: "Afternoons and Weekends",
    sessionFee: 550,
    supervisor: "Sarika Desai"
  },
  {
    id: 5,
    name: "Rohan Mehta",
    image: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2234&q=80",
    university: "Fergusson College, Pune",
    yearOfStudy: "Final Year M.A. Psychology",
    specialInterests: ["Exam Anxiety", "Career Counseling", "Sports Psychology"],
    location: "Pune, Maharashtra",
    availability: "Flexible Timings",
    sessionFee: 400,
    supervisor: "Vikram Malhotra"
  },
  {
    id: 6,
    name: "Neha Sharma",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    university: "University of Hyderabad",
    yearOfStudy: "M.Phil Clinical Psychology",
    specialInterests: ["Family Therapy", "Child Psychology", "Parenting Issues"],
    location: "Hyderabad, Telangana",
    availability: "Afternoons and Evenings",
    sessionFee: 500,
    supervisor: "Anjali Khanna"
  }
];
