
export interface Game {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  benefits: string[];
  howToPlay: string[];
  tips?: string[];
  externalLink?: string;
}

export const games: Game[] = [
  {
    id: 1,
    title: "Mindful Coloring",
    category: "Mindfulness",
    description: "Engage in a soothing coloring activity designed to promote mindfulness, reduce anxiety, and provide a creative outlet for emotional expression.",
    image: "https://images.unsplash.com/photo-1513708929605-55c2112c0db4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    duration: "15-30 minutes",
    benefits: ["Anxiety reduction", "Stress relief", "Mindfulness practice", "Creative expression", "Improved focus"],
    howToPlay: [
      "Choose a coloring design that appeals to you",
      "Set aside time in a quiet, comfortable space",
      "Focus entirely on the colors and patterns",
      "Breathe deeply and regularly as you color",
      "Let thoughts come and go without judgment"
    ],
    tips: [
      "Try coloring for just 5 minutes when feeling overwhelmed",
      "Create a dedicated coloring space with good lighting",
      "Listen to calming music while coloring",
      "Notice how different colors affect your mood"
    ],
    externalLink: "https://www.colormandala.com/"
  },
  {
    id: 2,
    title: "Emotional Journaling",
    category: "Self-reflection",
    description: "A structured journaling exercise that helps identify, process, and understand emotions through guided prompts and reflection questions.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    duration: "10-20 minutes",
    benefits: ["Emotional clarity", "Stress reduction", "Self-awareness", "Processing difficult feelings", "Tracking mood patterns"],
    howToPlay: [
      "Find a quiet space where you won't be interrupted",
      "Write about your current emotional state without filtering",
      "Identify what might have triggered these feelings",
      "Explore how your emotions are affecting your body",
      "End by writing one positive thing you can do next"
    ],
    tips: [
      "Try to journal at the same time each day",
      "Don't worry about grammar or spelling",
      "If stuck, use prompts like 'Today I feel...' or 'I notice that...'",
      "Review past entries periodically to identify patterns"
    ]
  },
  {
    id: 3,
    title: "Breathing Bubbles",
    category: "Relaxation",
    description: "An interactive breathing game that helps practice deep breathing techniques through animated bubble visualization.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    duration: "5 minutes",
    benefits: ["Stress reduction", "Anxiety management", "Improved focus", "Better emotional regulation", "Sleep preparation"],
    howToPlay: [
      "Sit in a comfortable position",
      "Watch as bubbles appear on screen",
      "Inhale deeply as the bubble expands",
      "Hold briefly at full expansion",
      "Exhale slowly as the bubble shrinks"
    ],
    tips: [
      "Practice when feeling calm to build the skill",
      "Use before stressful events as prevention",
      "Try with eyes closed once familiar with the rhythm",
      "Combine with peaceful nature sounds"
    ],
    externalLink: "https://www.calm.com/breathe"
  },
  {
    id: 4,
    title: "Gratitude Scavenger Hunt",
    category: "Mindfulness",
    description: "A fun activity that involves finding and photographing things you're grateful for, fostering positive thinking and appreciation.",
    image: "https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2233&q=80",
    duration: "30-60 minutes",
    benefits: ["Positive focus", "Mindful awareness", "Mood elevation", "Reduced anxiety", "Appreciation of daily life"],
    howToPlay: [
      "Create a list of items to find (e.g., something that makes you smile, something beautiful in nature)",
      "Set a time limit (30-60 minutes)",
      "Take photos or notes of items as you find them",
      "For each item, write why you're grateful for it",
      "Review your collection at the end and reflect"
    ],
    tips: [
      "Play with friends or family for a shared experience",
      "Try in different environments (home, outdoors, work)",
      "Create themed hunts (colors, textures, relationships)",
      "Make it a weekly ritual to build gratitude habits"
    ]
  },
  {
    id: 5,
    title: "Word Association Meditation",
    category: "Mindfulness",
    description: "A meditative game that uses random words as prompts for focused attention and creative thinking.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    duration: "10 minutes",
    benefits: ["Improved concentration", "Creative thinking", "Mindful awareness", "Mental flexibility", "Present moment focus"],
    howToPlay: [
      "Sit comfortably with eyes closed",
      "Choose a starting word or have one provided randomly",
      "Focus entirely on that word for 30 seconds",
      "Let your mind generate the next associated word naturally",
      "Repeat the process, following the chain of associations"
    ],
    tips: [
      "Notice when your mind wanders and gently return to the exercise",
      "Observe patterns in your word associations",
      "Try writing down the words afterward to track your mental journey",
      "Use as a brief mental reset during stressful days"
    ]
  },
  {
    id: 6,
    title: "Emotional Intelligence Trivia",
    category: "Social Skills",
    description: "A quiz-style game that tests and improves emotional intelligence through scenarios, facial expression recognition, and emotional vocabulary.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "15-20 minutes",
    benefits: ["Enhanced emotional awareness", "Better communication skills", "Improved empathy", "Relationship building", "Self-reflection"],
    howToPlay: [
      "Answer questions about emotions in different scenarios",
      "Identify emotions from facial expressions or body language",
      "Match complex emotion words to their definitions",
      "Rate the intensity of emotions in sample situations",
      "Get feedback on answers to improve understanding"
    ],
    tips: [
      "Play with others to discuss different perspectives",
      "Reflect on answers that surprise you",
      "Apply insights to recent personal experiences",
      "Keep a journal of new emotional vocabulary learned"
    ],
    externalLink: "https://www.emotionalcompetency.com/frames.htm"
  },
  {
    id: 7,
    title: "Progressive Muscle Relaxation Adventure",
    category: "Relaxation",
    description: "A guided relaxation journey that combines storytelling with progressive muscle relaxation techniques to reduce physical tension.",
    image: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    duration: "15 minutes",
    benefits: ["Reduced muscle tension", "Stress relief", "Better body awareness", "Improved sleep", "Anxiety reduction"],
    howToPlay: [
      "Lie down in a comfortable position",
      "Follow the narrated story that guides you through different environments",
      "Tense and relax muscle groups as directed within the story",
      "Notice the contrast between tension and relaxation",
      "By the end, experience full-body relaxation"
    ],
    tips: [
      "Practice in a quiet, comfortable setting",
      "Use before bed to improve sleep quality",
      "Try different themed adventures (beach, forest, space)",
      "Combine with gentle background sounds"
    ]
  },
  {
    id: 8,
    title: "Mood-Boosting Memory Match",
    category: "Cognitive",
    description: "A positive-themed memory matching game featuring uplifting images and affirmations that improve mood while exercising memory skills.",
    image: "https://images.unsplash.com/photo-1606986565193-b7ecdacd4614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    duration: "5-10 minutes",
    benefits: ["Improved memory", "Positive thought promotion", "Increased focus", "Mood elevation", "Stress reduction"],
    howToPlay: [
      "Start with a grid of face-down cards",
      "Turn over two cards at a time, trying to find matching pairs",
      "When a match is found, read or reflect on the positive message",
      "Continue until all pairs are matched",
      "Take a moment to recall the positive messages at the end"
    ],
    tips: [
      "Start with smaller grids and work up to larger challenges",
      "Create custom cards with personal positive memories or affirmations",
      "Say the affirmations out loud when matched",
      "Play when feeling low for a quick mood boost"
    ],
    externalLink: "https://www.memozor.com/memory-games"
  },
  {
    id: 9,
    title: "Emotional Weather Report",
    category: "Self-reflection",
    description: "A creative visualization activity where you describe your emotional state as a weather report, helping to externalize and understand feelings.",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2351&q=80",
    duration: "5-10 minutes",
    benefits: ["Emotional awareness", "Creative expression", "Emotional distance", "Communication skills", "Acceptance of feelings"],
    howToPlay: [
      "Take a moment to check in with your emotional state",
      "Visualize your emotions as weather conditions (sunny, stormy, foggy, etc.)",
      "Create a detailed weather report including temperature, forecast, and conditions",
      "Draw or write out your weather report",
      "Reflect on what might change your emotional weather"
    ],
    tips: [
      "Use weather apps as inspiration for report format",
      "Track your emotional weather daily to see patterns",
      "Share reports with trusted friends or therapists",
      "Remember that all weather is temporary"
    ]
  }
];
