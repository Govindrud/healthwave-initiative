
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Twitter, MessageCircle, Heart, RefreshCw, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SocialPost {
  id: string;
  platform: "twitter" | "linkedin";
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  retweets?: number;
}

const SocialFeed = () => {
  const [activeTab, setActiveTab] = useState<string>("twitter");
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data
  const mockPosts: SocialPost[] = [
    {
      id: "t1",
      platform: "twitter",
      author: {
        name: "Alex Johnson",
        handle: "@alexj_mh",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      content: "Just discovered @MeantToHelp and I'm impressed with their approach to mental health support. The student involvement is brilliant! #MentalHealthMatters",
      timestamp: "2h ago",
      likes: 24,
      comments: 5,
      retweets: 7,
    },
    {
      id: "t2",
      platform: "twitter",
      author: {
        name: "Mental Health Today",
        handle: "@MHToday",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      content: "Innovative platforms like @MeantToHelp are changing how we approach mental health challenges. Their community-based model is something to watch. #Innovation #MentalHealth",
      timestamp: "5h ago",
      likes: 56,
      comments: 12,
      retweets: 18,
    },
    {
      id: "t3",
      platform: "twitter",
      author: {
        name: "Sarah Williams",
        handle: "@sarahw",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      content: "Used the MindfulMe app from @MeantToHelp for a week now, and my anxiety levels have noticeably decreased. Thank you for this resource! #AnxietyRelief",
      timestamp: "1d ago",
      likes: 89,
      comments: 14,
      retweets: 23,
    },
    {
      id: "l1",
      platform: "linkedin",
      author: {
        name: "Dr. Michelle Chen",
        handle: "Clinical Psychologist at Boston Health",
        avatar: "https://i.pravatar.cc/100?img=4",
      },
      content: "I've been following MeantToHelp's progress for several months, and I'm thoroughly impressed with their approach to mental health innovation. By connecting real-world challenges with student innovators, they're creating solutions that are both effective and accessible.",
      timestamp: "3d ago",
      likes: 128,
      comments: 18,
    },
    {
      id: "l2",
      platform: "linkedin",
      author: {
        name: "Tech for Mental Health Group",
        handle: "Industry Organization • 15,623 followers",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      content: "We're excited to announce MeantToHelp as our featured innovation partner this month! Their platform is creating meaningful bridges between those facing mental health challenges and the next generation of solution creators.",
      timestamp: "1w ago",
      likes: 245,
      comments: 37,
    },
  ];

  useEffect(() => {
    // Simulate loading posts
    setIsLoading(true);
    setTimeout(() => {
      setPosts(mockPosts.filter(post => post.platform === activeTab));
      setIsLoading(false);
    }, 1000);
  }, [activeTab]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="section-container bg-gradient-to-b from-meant-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            Social Conversations
          </span>
          <h2 className="font-bold mb-6 text-balance">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
              What People Are Saying
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Join the conversation about mental health on social media. See what others are sharing 
            about their experiences and our solutions, or contribute your own perspective.
          </p>
        </div>

        <Tabs defaultValue="twitter" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="glass">
              <TabsTrigger value="twitter" className="flex items-center gap-2">
                <Twitter size={16} className="text-blue-400" />
                Twitter
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <Linkedin size={16} className="text-blue-700" />
                LinkedIn
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="twitter" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <RefreshCw size={24} className="text-meant-500 animate-spin" />
              </div>
            ) : (
              <motion.div 
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {posts.map(post => (
                  <motion.div 
                    key={post.id}
                    className="glass rounded-xl p-4 hover-effect"
                    variants={item}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{post.author.name}</p>
                            <p className="text-muted-foreground text-xs">{post.author.handle}</p>
                          </div>
                          <Twitter size={16} className="text-blue-400 flex-shrink-0" />
                        </div>
                        <p className="mt-2 text-sm">{post.content}</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{post.timestamp}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <MessageCircle size={14} className="mr-1" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center">
                              <RefreshCw size={14} className="mr-1" />
                              <span>{post.retweets}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart size={14} className="mr-1" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="linkedin" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <RefreshCw size={24} className="text-meant-500 animate-spin" />
              </div>
            ) : (
              <motion.div 
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {posts.map(post => (
                  <motion.div 
                    key={post.id}
                    className="glass rounded-xl p-4 hover-effect"
                    variants={item}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{post.author.name}</p>
                            <p className="text-muted-foreground text-xs">{post.author.handle}</p>
                          </div>
                          <Linkedin size={16} className="text-blue-700 flex-shrink-0" />
                        </div>
                        <p className="mt-2 text-sm">{post.content}</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{post.timestamp}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <MessageCircle size={14} className="mr-1" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart size={14} className="mr-1" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="rounded-full border-meant-200 hover:bg-meant-50 text-meant-800"
          >
            View More Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
