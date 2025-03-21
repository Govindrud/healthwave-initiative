
export interface Doctor {
  id: number;
  name: string;
  image: string;
  specialty: string;
  qualifications: string;
  experience: number;
  location: string;
  availability: string;
  patientsHelped: number;
  rating: number;
  consultationFee: number;
  bio?: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specialty: "Psychiatrist",
    qualifications: "MBBS, MD Psychiatry",
    experience: 12,
    location: "Pune, Maharashtra",
    availability: "Mon, Wed, Fri",
    patientsHelped: 2500,
    rating: 4.9,
    consultationFee: 1800,
    bio: "Dr. Arjun Sharma is a seasoned psychiatrist with over 12 years of experience treating various mental health conditions including depression, anxiety, bipolar disorder, and schizophrenia. He takes a patient-centered approach, combining medication management with therapeutic techniques."
  },
  {
    id: 2,
    name: "Priya Patel",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    specialty: "Clinical Psychologist",
    qualifications: "M.Phil Clinical Psychology, RCI Licensed",
    experience: 8,
    location: "Mumbai, Maharashtra",
    availability: "Tue, Thu, Sat",
    patientsHelped: 1800,
    rating: 4.8,
    consultationFee: 1500,
    bio: "Dr. Priya Patel specializes in cognitive-behavioral therapy, dialectical behavior therapy, and mindfulness-based interventions. She has expertise in treating trauma, anxiety disorders, and eating disorders, with a focus on culturally-sensitive care."
  },
  {
    id: 3,
    name: "Rajat Verma",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specialty: "Child Psychiatrist",
    qualifications: "MBBS, MD, Fellowship in Child Psychiatry",
    experience: 15,
    location: "Delhi NCR",
    availability: "Mon, Tue, Thu",
    patientsHelped: 3000,
    rating: 4.9,
    consultationFee: 2200,
    bio: "Dr. Rajat Verma is a child psychiatrist who specializes in treating children and adolescents with ADHD, autism spectrum disorders, anxiety, depression, and behavioral problems. He employs a family-centered approach, involving parents in the therapeutic process."
  },
  {
    id: 4,
    name: "Sarika Desai",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specialty: "Psychotherapist",
    qualifications: "MA Clinical Psychology, Certified Therapist",
    experience: 7,
    location: "Bangalore, Karnataka",
    availability: "Wed, Fri, Sat",
    patientsHelped: 1200,
    rating: 4.7,
    consultationFee: 1300,
    bio: "Sarika Desai is a psychotherapist trained in various therapeutic modalities including psychodynamic therapy, solution-focused therapy, and emotion-focused therapy. She has extensive experience working with relationship issues, life transitions, grief, and personal development."
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    specialty: "Addiction Psychiatrist",
    qualifications: "MBBS, MD Psychiatry, Fellowship in Addiction Medicine",
    experience: 10,
    location: "Hyderabad, Telangana",
    availability: "Mon, Wed, Sat",
    patientsHelped: 1500,
    rating: 4.8,
    consultationFee: 1700,
    bio: "Dr. Vikram Malhotra specializes in addiction psychiatry, treating substance use disorders and behavioral addictions. He employs evidence-based approaches including medication-assisted treatment and motivational interviewing, focusing on dual diagnosis and relapse prevention."
  },
  {
    id: 6,
    name: "Anjali Khanna",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    specialty: "Geriatric Psychiatrist",
    qualifications: "MBBS, DNB Psychiatry, Fellowship in Geriatric Mental Health",
    experience: 14,
    location: "Chennai, Tamil Nadu",
    availability: "Tue, Thu, Fri",
    patientsHelped: 2200,
    rating: 4.9,
    consultationFee: 1900,
    bio: "Dr. Anjali Khanna specializes in geriatric psychiatry, focusing on mental health issues affecting older adults including dementia, depression, anxiety, and sleep disorders. She takes a holistic approach, addressing psychological, social, and physical aspects of aging."
  }
];
