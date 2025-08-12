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
    consensusScore: 84.7
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
    consensusScore: 96.0
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
    consensusScore: 25.1
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
  
  const { toast } = useToast();

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

    // Update user balance
    setUserStats(prev => ({ 
      ...prev, 
      vrtBalance: prev.vrtBalance - 10,
      reputation: isUpvote ? prev.reputation + 0.5 : Math.max(10, prev.reputation - 1)
    }));

    // Update post votes
    const updatedPosts = mockPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          votesFor: isUpvote ? post.votesFor + 1 : post.votesFor,
          votesAgainst: !isUpvote ? post.votesAgainst + 1 : post.votesAgainst,
          vrtStaked: post.vrtStaked + 10
        };
      }
      return post;
    });

    toast({
      title: isUpvote ? "Verification Vote Cast" : "Dispute Vote Cast",
      description: `You voted to ${isUpvote ? 'verify' : 'dispute'} this claim. 10 VRT staked.`
    });
  };

  const handleStake = (postId: string) => {
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowStaking(true);
    }
  };

  const handleStakeSubmit = (amount: number, side: 'verify' | 'dispute') => {
    if (!selectedPost) return;
    
    // Update post with new stake
    const updatedPosts = mockPosts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          vrtStaked: post.vrtStaked + amount,
          votesFor: side === 'verify' ? post.votesFor + 1 : post.votesFor,
          votesAgainst: side === 'dispute' ? post.votesAgainst + 1 : post.votesAgainst
        };
      }
      return post;
    });

    setUserStats(prev => ({ ...prev, vrtBalance: prev.vrtBalance - amount }));
    setShowStaking(false);
    setSelectedPost(null);
    
    toast({
      title: "Stake Placed Successfully",
      description: `${amount} VRT staked to ${side} the claim. Good luck!`
    });
  };

  const handleGetStarted = () => {
    setShowHero(false);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -right-20 h-[300px] w-[400px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary)/0.25) 0%, transparent 70%)" }}
        />
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

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-3 text-center rounded-lg">
            <div className="text-lg font-bold text-verity-blue mb-1">15,234</div>
            <div className="text-xs text-muted-foreground">Claims Verified</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-3 text-center rounded-lg">
            <div className="text-lg font-bold text-trust-green mb-1">1.2M</div>
            <div className="text-xs text-muted-foreground">VRT Staked</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-3 text-center rounded-lg">
            <div className="text-lg font-bold text-verify-gold mb-1">25,891</div>
            <div className="text-xs text-muted-foreground">Active Verifiers</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-3 text-center rounded-lg">
            <div className="text-lg font-bold text-foreground mb-1">98.5%</div>
            <div className="text-xs text-muted-foreground">Accuracy Rate</div>
          </div>
        </div>

        {/* Key Mechanisms */}
        <div className="mb-6 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-trust-green/20 text-trust-green flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <div className="font-medium text-foreground">Stake VRT</div>
                <div className="text-muted-foreground">Vote with 10+ VRT to verify or dispute claims</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-verify-gold/20 text-verify-gold flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="font-medium text-foreground">Earn Rewards</div>
                <div className="text-muted-foreground">Correct votes earn ~8.57% returns</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-verity-blue/20 text-verity-blue flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <div className="font-medium text-foreground">Build Rep</div>
                <div className="text-muted-foreground">Reputation affects voting weight & rewards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-card/50 backdrop-blur-sm border border-border/30">
            <TabsTrigger value="trending" className="text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="verified" className="text-sm">
              <Shield className="w-4 h-4 mr-1" />
              Verified
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-4 mt-4">
            {mockPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={handleVote}
                onStake={handleStake}
              />
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4 mt-4">
            {[...mockPosts].reverse().map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={handleVote}
                onStake={handleStake}
              />
            ))}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4 mt-4">
            {mockPosts.filter(post => post.verificationStatus === 'verified').map((post) => (
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