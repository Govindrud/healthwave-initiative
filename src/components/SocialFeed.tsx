
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, MessageCircle, Heart, Repeat2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TweetProps {
  username: string;
  handle: string;
  content: string;
  timeAgo: string;
  likes: number;
  retweets: number;
  comments: number;
}

const Tweet = ({ username, handle, content, timeAgo, likes, retweets, comments }: TweetProps) => (
  <motion.div 
    className="border border-gray-200 rounded-lg p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-start mb-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
        <img 
          src={`https://ui-avatars.com/api/?name=${username.split(' ').join('+')}&background=random`} 
          alt={username}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="font-bold text-sm">{username}</h4>
          <span className="text-gray-500 text-xs ml-2">@{handle}</span>
        </div>
        <p className="text-sm mt-1">{content}</p>
      </div>
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-3">
      <span>{timeAgo}</span>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <Heart className="w-3 h-3 mr-1" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center">
          <Repeat2 className="w-3 h-3 mr-1" />
          <span>{retweets}</span>
        </div>
        <div className="flex items-center">
          <MessageCircle className="w-3 h-3 mr-1" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const SocialFeed = () => {
  const tweets = [
    {
      username: "Alex Johnson",
      handle: "alexj_rsh",
      content: "Just discovered @MeantToHelp and I'm impressed with their approach to mental health support. The student involvement is brilliant! #MentalHealthMatters",
      timeAgo: "2h ago",
      likes: 5,
      retweets: 7,
      comments: 24
    },
    {
      username: "Mental Health Today",
      handle: "MHToday",
      content: "Innovative platforms like @MeantToHelp are changing how we approach mental health challenges. Their community-based model is something to watch. #Innovation #MentalHealth",
      timeAgo: "5h ago",
      likes: 12,
      retweets: 18,
      comments: 56
    },
    {
      username: "Sarah Williams",
      handle: "sarahw",
      content: "Used the MindfulMe app from @MeantToHelp for a week now, and my anxiety levels have noticeably decreased. Thank you for this resource! #AnxietyRelief",
      timeAgo: "1d ago",
      likes: 14,
      retweets: 23,
      comments: 89
    }
  ];

  return (
    <section id="social" className="section-container bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Social Conversations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">What People Are Saying</p>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Join the conversation about mental health on social media. See what others are 
            sharing about their experiences and our solutions, or contribute your own perspective.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="twitter" className="mb-8">
            <TabsList className="mx-auto flex justify-center mb-6">
              <TabsTrigger value="twitter" className="flex items-center gap-2">
                <Twitter size={16} /> Twitter
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <Linkedin size={16} /> LinkedIn
              </TabsTrigger>
            </TabsList>
            <TabsContent value="twitter">
              <div className="space-y-5">
                {tweets.map((tweet, index) => (
                  <Tweet key={index} {...tweet} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="linkedin">
              <div className="text-center py-8">
                <p className="text-gray-500">Connect with us on LinkedIn for professional updates and discussions.</p>
                <Button variant="outline" className="mt-4">Visit Our LinkedIn Page</Button>
              </div>
            </TabsContent>
          </Tabs>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button variant="outline" className="mx-2">
              View More Posts
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
