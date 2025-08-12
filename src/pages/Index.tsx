import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { StakingModal } from "@/components/StakingModal";
import { InvestorPitch } from "@/components/InvestorPitch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from blockchain/API
const mockPosts = [
  {
    id: "1",
    title: "Breaking: New Climate Report Shows 2024 Was Warmest Year on Record",
    content: "According to NOAA's latest climate report, 2024 has officially been declared the warmest year in recorded history, with global temperatures averaging 1.2°C above pre-industrial levels. The report cites increased greenhouse gas emissions and reduced polar ice coverage as primary factors.",
    author: "ClimateWatcher92",
    authorReputation: 87,
    timestamp: "2 hours ago",
    category: "Climate",
    verificationStatus: "pending" as const,
    vrtStaked: 1250,
    votesFor: 127,
    votesAgainst: 23,
    comments: 45,
    consensusScore: 84.7,
    rewardPool: 25.0 // 20% of 1250 staked
  },
  {
    id: "2", 
    title: "Study: Mediterranean Diet Reduces Heart Disease Risk by 30%",
    content: "A new longitudinal study involving 25,000 participants over 10 years has found that following a Mediterranean diet can reduce the risk of cardiovascular disease by up to 30%. The study was published in the Journal of Medical Research and peer-reviewed by leading cardiologists.",
    author: "HealthResearcher",
    authorReputation: 94,
    timestamp: "4 hours ago",
    category: "Health",
    verificationStatus: "verified" as const,
    vrtStaked: 2100,
    votesFor: 289,
    votesAgainst: 12,
    comments: 67,
    consensusScore: 96.0,
    rewardPool: 42.0 // 20% of 2100 staked
  },
  {
    id: "3",
    title: "Tech Company X Announces Breakthrough in Quantum Computing",
    content: "Company X claims to have achieved quantum supremacy with their new 1000-qubit processor, capable of solving complex calculations exponentially faster than classical computers. However, several experts question the validity of their benchmarks and testing methodology.",
    author: "TechAnalyst",
    authorReputation: 73,
    timestamp: "6 hours ago", 
    category: "Technology",
    verificationStatus: "disputed" as const,
    vrtStaked: 890,
    votesFor: 45,
    votesAgainst: 134,
    comments: 89,
    consensusScore: 25.1,
    rewardPool: 17.8 // 20% of 890 staked
  }
];

const Index = () => {
  const [userStats, setUserStats] = useState({
    vrtBalance: 125.50,
    reputation: 78
  });
  
  const [showStaking, setShowStaking] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
  const [activeTab, setActiveTab] = useState("trending");
  const [showHero, setShowHero] = useState(true);
  const [posts, setPosts] = useState(mockPosts);
  
  const { toast } = useToast();

  // Calculate reward based on stake and reputation using Verity formula
  const calculateReward = (stakeAmount: number, userReputation: number, rewardPool: number) => {
    // B_i = P × (R_i / ∑R_j) - simplified for demo
    const reputationWeight = userReputation / 100; // normalize reputation
    return (rewardPool * reputationWeight * (stakeAmount / 100)).toFixed(2);
  };

  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connection",
      description: "This feature will connect to your Web3 wallet in the full version."
    });
  };

  const handleSubmitPost = () => {
    // This is now handled by the Header component navigation
  };

  const handleVote = (postId: string, isUpvote: boolean) => {
    if (userStats.vrtBalance < 10) {
      toast({
        title: "Insufficient Balance",
        description: "You need at least 10 VRT to vote.",
        variant: "destructive"
      });
      return;
    }

    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;

    // Calculate reward for correct vote (demo logic)
    const potentialReward = calculateReward(10, userStats.reputation, targetPost.rewardPool);
    const isCorrectVote = Math.random() > 0.3; // 70% chance of being on winning side

    // Update posts state
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            votesFor: isUpvote ? post.votesFor + 1 : post.votesFor,
            votesAgainst: !isUpvote ? post.votesAgainst + 1 : post.votesAgainst,
            vrtStaked: post.vrtStaked + 10,
            rewardPool: post.rewardPool + 2 // 20% of new stake
          };
        }
        return post;
      })
    );

    // Update user stats
    setUserStats(prev => ({ 
      ...prev, 
      vrtBalance: prev.vrtBalance - 10 + (isCorrectVote ? parseFloat(potentialReward) : 0),
      reputation: isCorrectVote ? Math.min(100, prev.reputation + 0.5) : Math.max(10, prev.reputation - 1)
    }));

    toast({
      title: isUpvote ? "Verification Vote Cast" : "Dispute Vote Cast",
      description: isCorrectVote 
        ? `Correct vote! You earned ${potentialReward} VRT reward.`
        : `Vote recorded. Result pending consensus.`
    });
  };

  const handleStake = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowStaking(true);
    }
  };

  const handleStakeSubmit = (amount: number, side: 'verify' | 'dispute') => {
    if (!selectedPost) return;
    
    const potentialReward = calculateReward(amount, userStats.reputation, selectedPost.rewardPool);
    
    // Update posts state
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === selectedPost.id) {
          return {
            ...post,
            vrtStaked: post.vrtStaked + amount,
            votesFor: side === 'verify' ? post.votesFor + 1 : post.votesFor,
            votesAgainst: side === 'dispute' ? post.votesAgainst + 1 : post.votesAgainst,
            rewardPool: post.rewardPool + (amount * 0.2) // Add 20% to reward pool
          };
        }
        return post;
      })
    );

    setUserStats(prev => ({ ...prev, vrtBalance: prev.vrtBalance - amount }));
    setShowStaking(false);
    setSelectedPost(null);
    
    toast({
      title: "Stake Placed Successfully",
      description: `${amount} VRT staked to ${side}. Potential reward: ${potentialReward} VRT`
    });
  };

  const handleGetStarted = () => {
    setShowHero(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[200px] w-[300px] rounded-full blur-3xl opacity-10 bg-primary/20" />
      </div>
      <Header 
        vrtBalance={userStats.vrtBalance}
        reputation={userStats.reputation}
        onConnectWallet={handleConnectWallet}
        onSubmitPost={handleSubmitPost}
      />

      {showHero && (
        <Hero onGetStarted={handleGetStarted} />
      )}

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Minimal Stats */}
        <div className="flex justify-between items-center mb-6 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm">
            <span className="text-muted-foreground">Claims:</span> <span className="font-medium">15,234</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Staked:</span> <span className="font-medium text-verify-gold">1.2M VRT</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Accuracy:</span> <span className="font-medium text-trust-green">98.5%</span>
          </div>
        </div>

        {/* Simple Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="trending" className="text-sm">Trending</TabsTrigger>
            <TabsTrigger value="recent" className="text-sm">Recent</TabsTrigger>
            <TabsTrigger value="verified" className="text-sm">Verified</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-3 mt-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={handleVote}
                onStake={handleStake}
              />
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-3 mt-4">
            {[...posts].reverse().map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={handleVote}
                onStake={handleStake}
              />
            ))}
          </TabsContent>

          <TabsContent value="verified" className="space-y-3 mt-4">
            {posts.filter(post => post.verificationStatus === 'verified').map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={handleVote}
                onStake={handleStake}
              />
            ))}
          </TabsContent>
        </Tabs>

        {/* Investor Pitch Section */}
        <InvestorPitch />
      </main>

      {/* Staking Modal */}
      <StakingModal
        isOpen={showStaking}
        onClose={() => setShowStaking(false)}
        postTitle={selectedPost?.title || ""}
        currentStake={selectedPost?.vrtStaked || 0}
        userBalance={userStats.vrtBalance}
        onStake={handleStakeSubmit}
      />
    </div>
  );
};

export default Index;