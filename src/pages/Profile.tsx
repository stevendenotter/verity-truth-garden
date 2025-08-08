import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Shield, 
  TrendingUp, 
  Vote, 
  Award, 
  Calendar,
  Coins,
  History,
  Settings,
  ExternalLink
} from "lucide-react";

const Profile = () => {
  const [userStats] = useState({
    vrtBalance: 125.50,
    reputation: 78,
    totalVotes: 143,
    correctVotes: 112,
    accuracy: 78.3,
    totalStaked: 2850,
    totalEarned: 234.5,
    joinDate: "March 2024",
    level: "Trusted Verifier",
    referrals: 8
  });

  const recentActivity = [
    { type: "vote", claim: "Climate Report Shows Record Temperatures", outcome: "correct", reward: 8.5, date: "2 hours ago" },
    { type: "stake", claim: "New Medical Study Results", amount: 25, date: "1 day ago" },
    { type: "vote", claim: "Tech Company Quarterly Results", outcome: "correct", reward: 12.3, date: "2 days ago" },
    { type: "post", claim: "Archaeological Discovery in Egypt", cost: 1, date: "1 week ago" }
  ];

  const badges = [
    { name: "Early Adopter", icon: "🚀", description: "Joined in the first month" },
    { name: "Truth Seeker", icon: "🔍", description: "Voted on 100+ claims" },
    { name: "Accuracy Expert", icon: "🎯", description: "75%+ voting accuracy" },
    { name: "Community Builder", icon: "👥", description: "Referred 5+ users" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="glass-card mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-verity-blue to-trust-green flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">TruthSeeker92</h1>
                  <Badge className="bg-trust-green/10 text-trust-green border-trust-green/20">
                    {userStats.level}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userStats.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Vote className="w-4 h-4" />
                    <span>{userStats.totalVotes} votes cast</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-verify-gold/10 border border-verify-gold/20 rounded-lg">
                    <div className="text-xl font-bold text-verify-gold">{userStats.vrtBalance}</div>
                    <div className="text-xs text-verify-gold">VRT Balance</div>
                  </div>
                  <div className="text-center p-3 bg-trust-green/10 border border-trust-green/20 rounded-lg">
                    <div className="text-xl font-bold text-trust-green">{userStats.reputation}</div>
                    <div className="text-xs text-trust-green">Reputation</div>
                  </div>
                  <div className="text-center p-3 bg-verity-blue/10 border border-verity-blue/20 rounded-lg">
                    <div className="text-xl font-bold text-verity-blue">{userStats.accuracy}%</div>
                    <div className="text-xs text-verity-blue">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xl font-bold">{userStats.totalEarned}</div>
                    <div className="text-xs text-muted-foreground">VRT Earned</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="ml-auto">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Reputation Progress */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-trust-green" />
                    Reputation Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Level: {userStats.level}</span>
                      <span>{userStats.reputation}/100</span>
                    </div>
                    <Progress value={userStats.reputation} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-trust-green">{userStats.correctVotes}</div>
                      <div className="text-muted-foreground">Correct Votes</div>
                    </div>
                    <div>
                      <div className="font-semibold text-destructive">{userStats.totalVotes - userStats.correctVotes}</div>
                      <div className="text-muted-foreground">Incorrect Votes</div>
                    </div>
                  </div>

                  <div className="p-3 bg-trust-green/10 border border-trust-green/20 rounded">
                    <div className="text-sm font-medium text-trust-green">Next Level: Expert Verifier</div>
                    <div className="text-xs text-trust-green/80">Need 90+ reputation to unlock</div>
                  </div>
                </CardContent>
              </Card>

              {/* Staking Overview */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-verify-gold" />
                    Staking Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded">
                      <div className="text-lg font-semibold">{userStats.totalStaked}</div>
                      <div className="text-xs text-muted-foreground">Total Staked</div>
                    </div>
                    <div className="text-center p-3 bg-verify-gold/10 border border-verify-gold/20 rounded">
                      <div className="text-lg font-semibold text-verify-gold">{userStats.totalEarned}</div>
                      <div className="text-xs text-verify-gold">Total Earned</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ROI</span>
                      <span className="font-semibold text-trust-green">+8.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Stakes</span>
                      <span>3 claims</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending Rewards</span>
                      <span className="text-verify-gold">45.2 VRT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-verity-blue/10 flex items-center justify-center">
                        {activity.type === 'vote' && <Vote className="w-5 h-5 text-verity-blue" />}
                        {activity.type === 'stake' && <TrendingUp className="w-5 h-5 text-verify-gold" />}
                        {activity.type === 'post' && <User className="w-5 h-5 text-trust-green" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium capitalize">{activity.type}</div>
                        <div className="text-sm text-muted-foreground">{activity.claim}</div>
                      </div>
                      
                      <div className="text-right">
                        {activity.outcome && (
                          <Badge className={activity.outcome === 'correct' ? 'text-trust-green bg-trust-green/10 border-trust-green/20' : 'text-destructive bg-destructive/10 border-destructive/20'}>
                            {activity.outcome}
                          </Badge>
                        )}
                        {activity.reward && (
                          <div className="text-sm font-medium text-verify-gold">+{activity.reward} VRT</div>
                        )}
                        {activity.amount && (
                          <div className="text-sm font-medium text-verity-blue">{activity.amount} VRT</div>
                        )}
                        {activity.cost && (
                          <div className="text-sm font-medium text-muted-foreground">-{activity.cost} VRT</div>
                        )}
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-verify-gold" />
                  Achievements & Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
                      <div className="text-3xl">{badge.icon}</div>
                      <div>
                        <div className="font-semibold">{badge.name}</div>
                        <div className="text-sm text-muted-foreground">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-trust-green/10 border border-trust-green/20 rounded-lg">
                    <div className="text-2xl font-bold text-trust-green">{userStats.referrals}</div>
                    <div className="text-sm text-trust-green">Successful Referrals</div>
                  </div>
                  <div className="text-center p-4 bg-verify-gold/10 border border-verify-gold/20 rounded-lg">
                    <div className="text-2xl font-bold text-verify-gold">{userStats.referrals * 5}</div>
                    <div className="text-sm text-verify-gold">VRT Earned</div>
                  </div>
                  <div className="text-center p-4 bg-verity-blue/10 border border-verity-blue/20 rounded-lg">
                    <div className="text-2xl font-bold text-verity-blue">5</div>
                    <div className="text-sm text-verity-blue">VRT per Referral</div>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Your Referral Link</h4>
                  <div className="flex gap-2">
                    <input 
                      readOnly 
                      value="https://verity.app/ref/truthseeker92"
                      className="flex-1 p-2 bg-background border rounded text-sm"
                    />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Earn 5 VRT for each user who joins using your link and remains active for 7 days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;