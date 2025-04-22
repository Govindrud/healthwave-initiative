import { Product, ProductCategory } from "@/types/product";

export const productCategories: ProductCategory[] = [
  {
    id: "meditation",
    name: "Meditation",
    description: "Products to help you achieve mindfulness and peace",
    slug: "meditation"
  },
  {
    id: "sleep",
    name: "Sleep",
    description: "Solutions for better sleep and rest",
    slug: "sleep"
  },
  {
    id: "anxiety",
    name: "Anxiety Relief",
    description: "Tools to manage and reduce anxiety",
    slug: "anxiety"
  },
  {
    id: "stress",
    name: "Stress Management",
    description: "Products designed to help manage everyday stress",
    slug: "stress"
  },
  {
    id: "focus",
    name: "Focus & Concentration",
    description: "Enhance your mental clarity and concentration",
    slug: "focus"
  },
  {
    id: "selfcare",
    name: "Self-Care",
    description: "Essential self-care items for mental wellbeing",
    slug: "selfcare"
  }
];

export const products: Product[] = [
  {
    id: "calming-weighted-blanket",
    name: "Calming Weighted Blanket",
    shortDescription: "Reduce anxiety with gentle, even pressure",
    description: "Our premium weighted blanket offers gentle, distributed pressure that helps reduce anxiety and improve sleep quality. The soft, breathable fabric ensures comfort while the evenly distributed glass beads provide a calming effect similar to being hugged, triggering the release of serotonin and melatonin for natural relaxation.",
    price: 129.99,
    discountPrice: 99.99,
    category: "anxiety",
    image: "/images/products/weighted-blanket.jpg",
    badge: "popular",
    rating: 4.8,
    stock: 24,
    features: [
      "Evenly distributed weight for maximum comfort",
      "Breathable cotton cover for all-season use",
      "Removable, machine-washable cover",
      "Helps reduce anxiety and improve sleep quality",
      "Available in multiple weights (10lb, 15lb, 20lb)"
    ]
  },
  {
    id: "mindfulness-meditation-cushion",
    name: "Mindfulness Meditation Cushion",
    shortDescription: "Ergonomic support for longer meditation sessions",
    description: "This ergonomically designed meditation cushion provides proper support for your spine and hips during meditation. The buckwheat hull filling conforms to your body's shape while providing firm support, making longer meditation sessions more comfortable and effective. The cushion elevates your hips, allowing your knees to rest lower and reducing strain on your back.",
    price: 49.99,
    category: "meditation",
    image: "/images/products/meditation-cushion.jpg",
    rating: 4.6,
    stock: 35,
    features: [
      "Ergonomic design for proper posture",
      "Buckwheat hull filling adapts to your body",
      "Removable, washable organic cotton cover",
      "Handle for easy transport",
      "Available in multiple calming colors"
    ]
  },
  {
    id: "sleep-sound-machine",
    name: "Sleep Sound Machine",
    shortDescription: "Customizable soundscapes for restful sleep",
    description: "Our sleep sound machine creates the perfect acoustic environment for restful sleep. With 30 high-fidelity nature sounds, white noise variations, and guided sleep meditations, you can customize your perfect sleep soundtrack. The timer function allows you to fall asleep to gentle sounds that automatically fade out, while the compact design fits perfectly on your nightstand.",
    price: 79.99,
    discountPrice: 59.99,
    category: "sleep",
    image: "/images/products/sound-machine.jpg",
    badge: "sale",
    rating: 4.7,
    stock: 18,
    features: [
      "30 high-quality nature sounds and white noise options",
      "Built-in guided sleep meditations",
      "Programmable timer with gentle fade-out",
      "Compact design with night light option",
      "USB rechargeable with 12-hour battery life"
    ]
  },
  {
    id: "aromatherapy-diffuser",
    name: "Aromatherapy Diffuser",
    shortDescription: "Ultrasonic essential oil diffuser with calming light",
    description: "Transform your space into a haven of tranquility with our ultrasonic aromatherapy diffuser. Using ultrasonic technology to disperse essential oils into a fine mist, this diffuser helps create a calming atmosphere that can reduce stress and anxiety. The color-changing LED lights add a soothing visual element, while the whisper-quiet operation ensures peaceful relaxation or sleep.",
    price: 59.99,
    category: "stress",
    image: "/images/products/aromatherapy-diffuser.jpg",
    rating: 4.5,
    stock: 42,
    features: [
      "Ultrasonic technology for fine mist dispersion",
      "300ml water capacity for up to 10 hours of operation",
      "7 color-changing LED light options",
      "Auto shut-off safety feature",
      "Whisper-quiet operation"
    ]
  },
  {
    id: "focus-productivity-journal",
    name: "Focus & Clarity Journal",
    shortDescription: "Structured journaling for enhanced mental clarity",
    description: "Our specially designed productivity journal helps you organize thoughts, set intentions, and track your mental well-being. With scientifically backed prompts and structured layouts, this journal guides you through daily reflection, goal setting, and gratitude practices that enhance focus and reduce mental clutter. The high-quality paper and durable binding ensure your thoughts are preserved in a format you'll want to revisit.",
    price: 24.99,
    category: "focus",
    image: "/images/products/productivity-journal.jpg",
    badge: "new",
    rating: 4.9,
    stock: 55,
    features: [
      "90-day structured format with science-backed prompts",
      "Daily gratitude and intention setting sections",
      "Focus tracking and productivity techniques",
      "Mindfulness exercises integrated throughout",
      "Lay-flat binding and premium paper"
    ]
  },
  {
    id: "self-care-subscription-box",
    name: "Monthly Self-Care Box",
    shortDescription: "Curated mental wellness products delivered monthly",
    description: "Give yourself the gift of consistent self-care with our monthly subscription box. Each month, receive a thoughtfully curated collection of 5-7 premium products designed to support your mental wellbeing. From aromatherapy and mindfulness tools to healthy snacks and self-care activities, each box is designed by mental health professionals to provide a comprehensive approach to maintaining your emotional balance.",
    price: 39.99,
    category: "selfcare",
    image: "/images/products/selfcare-box.jpg",
    rating: 4.7,
    stock: 30,
    features: [
      "5-7 premium self-care products each month",
      "Curated by mental health professionals",
      "Includes digital resources and activities",
      "Different theme each month (Sleep, Calm, Energy, etc.)",
      "Flexible subscription options"
    ]
  },
  {
    id: "anxiety-relief-stones",
    name: "Anxiety Relief Stones",
    shortDescription: "Tactile worry stones for in-the-moment relief",
    description: "Our hand-selected and polished anxiety relief stones provide tactile comfort during moments of stress or anxiety. Carry these smooth stones in your pocket and use them as a grounding tool when anxious feelings arise. The repetitive motion of rubbing the stone's surface activates sensory nerves that can help interrupt anxiety cycles and bring you back to the present moment.",
    price: 19.99,
    category: "anxiety",
    image: "/images/products/anxiety-stones.jpg",
    rating: 4.4,
    stock: 62,
    features: [
      "Set of 3 hand-selected natural stones",
      "Polished with therapeutic thumb indentation",
      "Comes with mindfulness practice guide",
      "Natural variations make each set unique",
      "Pouch included for easy carrying"
    ]
  },
  {
    id: "sleep-tracking-mask",
    name: "Smart Sleep Mask",
    shortDescription: "Tracks sleep patterns with built-in sensors",
    description: "Combining comfort with technology, our smart sleep mask not only blocks light completely but also tracks your sleep patterns. The ultra-thin embedded sensors monitor REM cycles, movement, and sleep quality without any discomfort. Sync with our app to receive personalized insights and recommendations to improve your sleep quality naturally, without medication.",
    price: 89.99,
    category: "sleep",
    image: "/images/products/sleep-mask.jpg",
    rating: 4.6,
    stock: 15,
    features: [
      "Ultra-thin embedded sleep tracking sensors",
      "Complete blackout design with 3D eye cups",
      "Bluetooth connectivity to sleep analysis app",
      "Rechargeable battery lasts up to 7 nights",
      "Breathable, hypoallergenic materials"
    ]
  }
];

export function formatINR(val: number) {
  return "₹" + val.toLocaleString("en-IN");
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (count: number = 4): Product[] => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};
