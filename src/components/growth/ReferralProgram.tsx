
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, Share2, Gift, Users, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ReferralProgram = () => {
  const [referralCode] = useState('MTH-' + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [email, setEmail] = useState('');

  const referralStats = {
    totalReferrals: 12,
    successfulSignups: 8,
    creditsEarned: 240,
    currentStreak: 3
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const shareReferralLink = () => {
    const shareData = {
      title: 'Join MeantToHelp - Mental Health Support',
      text: 'Start your mental wellness journey with professional support and tools.',
      url: `https://meanttohelp.com/join?ref=${referralCode}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success('Referral link copied to clipboard!');
    }
  };

  const sendInviteEmail = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    // Simulate sending email invitation
    console.log('Sending invitation to:', email);
    toast.success(`Invitation sent to ${email}!`);
    setEmail('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-meant-800 mb-2">
          Share Mental Wellness
        </h1>
        <p className="text-muted-foreground">
          Help friends discover mental health support and earn rewards together
        </p>
      </motion.div>

      {/* Referral Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-meant-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-meant-800">{referralStats.totalReferrals}</div>
            <div className="text-sm text-muted-foreground">Total Referrals</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-meant-800">{referralStats.successfulSignups}</div>
            <div className="text-sm text-muted-foreground">Successful Signups</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-meant-800">₹{referralStats.creditsEarned}</div>
            <div className="text-sm text-muted-foreground">Credits Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <span className="text-2xl">🔥</span>
            <div className="text-2xl font-bold text-meant-800">{referralStats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your Referral Code
            </CardTitle>
            <CardDescription>
              Share this code or link with friends to give them 20% off their first month and earn ₹30 credit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-meant-50 border border-meant-200 rounded-lg font-mono text-lg text-center">
                  {referralCode}
                </div>
                <Button onClick={copyReferralCode} size="icon" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={shareReferralLink} className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Invitation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Invite by Email</CardTitle>
            <CardDescription>
              Send a personal invitation to someone who could benefit from mental health support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendInviteEmail}>
                Send Invite
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reward Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Referral Rewards</CardTitle>
            <CardDescription>
              Unlock bigger rewards as you help more people discover mental wellness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <Badge className="mb-2" variant="secondary">Bronze</Badge>
                  <div className="font-semibold">1-5 Referrals</div>
                  <div className="text-sm text-muted-foreground">₹30 per successful referral</div>
                </div>
                
                <div className="p-4 border-2 border-meant-200 rounded-lg bg-meant-50">
                  <Badge className="mb-2" variant="default">Silver - Current</Badge>
                  <div className="font-semibold">6-15 Referrals</div>
                  <div className="text-sm text-muted-foreground">₹50 per successful referral</div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <Badge className="mb-2" variant="outline">Gold</Badge>
                  <div className="font-semibold">16+ Referrals</div>
                  <div className="text-sm text-muted-foreground">₹75 per successful referral + bonuses</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReferralProgram;
