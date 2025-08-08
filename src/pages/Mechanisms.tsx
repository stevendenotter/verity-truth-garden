import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Vote, 
  Coins, 
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Mechanisms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Verity Protocol Mechanisms
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the mathematical foundations and economic incentives that power decentralized truth verification
          </p>
        </div>

        <div className="grid gap-8">
          {/* Truth-Incentivized Voting */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Vote className="w-6 h-6 text-verity-blue" />
                Truth-Incentivized Voting System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Users stake VRT tokens to vote on claim accuracy. Winners are rewarded based on consensus.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-trust-green">Consensus Formula</h4>
                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    O = round(∑W_i / ∑R_i)
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>O:</strong> Binary outcome (0 = false, 1 = true)</p>
                    <p><strong>W_i:</strong> Weighted vote (stake × reputation)</p>
                    <p><strong>R_i:</strong> User reputation score</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-verify-gold">Reward Distribution</h4>
                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    P = ∑(γ × S_i)<br/>
                    B_i = P × (R_i / ∑R_j)
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>P:</strong> Total reward pool</p>
                    <p><strong>γ:</strong> Redistribution rate (20%)</p>
                    <p><strong>S_i:</strong> Individual stake amount</p>
                    <p><strong>B_i:</strong> Individual reward based on reputation</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-trust-green/10 border border-trust-green/20 rounded-lg">
                <h5 className="font-semibold text-trust-green mb-2">Example Calculation</h5>
                <p className="text-sm">
                  If you stake 10 VRT with 80 reputation and win consensus, you earn approximately 
                  <strong className="text-trust-green"> 0.857 VRT</strong> reward (8.57% return).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reputation System */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-trust-green" />
                Dynamic Reputation System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Reputation scores track voting accuracy and influence future rewards and voting weight.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-trust-green">Correct Vote Bonus</h4>
                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    R'_i = R_i + 0.05 × (100 - R_i)
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>Asymptotic approach to maximum reputation (100)</p>
                    <p>Diminishing returns prevent rapid inflation</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-destructive">Incorrect Vote Penalty</h4>
                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    R'_i = R_i - 0.1 × R_i
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>10% reduction for incorrect votes</p>
                    <p>Prevents reputation manipulation</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-trust-green/10 border border-trust-green/20 rounded-lg">
                  <div className="text-2xl font-bold text-trust-green">50</div>
                  <div className="text-sm text-trust-green">Starting Reputation</div>
                </div>
                <div className="text-center p-4 bg-verify-gold/10 border border-verify-gold/20 rounded-lg">
                  <div className="text-2xl font-bold text-verify-gold">75+</div>
                  <div className="text-sm text-verify-gold">Trusted Verifier</div>
                </div>
                <div className="text-center p-4 bg-verity-blue/10 border border-verity-blue/20 rounded-lg">
                  <div className="text-2xl font-bold text-verity-blue">90+</div>
                  <div className="text-sm text-verity-blue">Expert Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Economics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Coins className="w-6 h-6 text-verify-gold" />
                VRT Token Economics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                The VRT token powers the entire ecosystem through staking, rewards, and governance participation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Token Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                      <span>Community Rewards</span>
                      <Badge className="bg-trust-green/10 text-trust-green border-trust-green/20">50%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                      <span>Team (3yr vest)</span>
                      <Badge className="bg-verity-blue/10 text-verity-blue border-verity-blue/20">20%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                      <span>Development</span>
                      <Badge className="bg-verify-gold/10 text-verify-gold border-verify-gold/20">20%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                      <span>Investors (2yr vest)</span>
                      <Badge variant="secondary">10%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Token Utility</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <Vote className="w-4 h-4 text-verity-blue" />
                      <span>Voting & Staking</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <Users className="w-4 h-4 text-trust-green" />
                      <span>Governance Participation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <Shield className="w-4 h-4 text-verify-gold" />
                      <span>Content Posting (1 VRT)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <TrendingUp className="w-4 h-4 text-verity-blue" />
                      <span>Reward Earning</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-xl font-bold">100M</div>
                  <div className="text-sm text-muted-foreground">Total Supply</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-xl font-bold">1 VRT</div>
                  <div className="text-sm text-muted-foreground">Post Cost</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-xl font-bold">10 VRT</div>
                  <div className="text-sm text-muted-foreground">Min Vote Stake</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-xl font-bold">5 VRT</div>
                  <div className="text-sm text-muted-foreground">Referral Bonus</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governance */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-verity-blue" />
                Decentralized Governance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Community-driven decision making with reputation-weighted voting and quorum requirements.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Voting Mechanics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span>Voting Power</span>
                      <code className="text-sm">1 VRT = 1 Vote</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span>Quorum Required</span>
                      <Badge className="bg-verity-blue/10 text-verity-blue border-verity-blue/20">20%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span>Proposal Duration</span>
                      <span className="text-sm">7 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Governance Scope</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <CheckCircle className="w-4 h-4 text-trust-green" />
                      <span>Protocol Parameters</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <CheckCircle className="w-4 h-4 text-trust-green" />
                      <span>Fee Structure</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <CheckCircle className="w-4 h-4 text-trust-green" />
                      <span>Reward Rates</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded">
                      <CheckCircle className="w-4 h-4 text-trust-green" />
                      <span>Platform Upgrades</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Economic Incentives */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-verify-gold" />
                Economic Incentive Alignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Mathematical models ensure truth-telling is the most profitable strategy for all participants.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-trust-green/10 border border-trust-green/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-trust-green mx-auto mb-3" />
                  <h4 className="font-semibold text-trust-green mb-2">Truth Rewards</h4>
                  <p className="text-sm text-trust-green/80">
                    Correct votes earn 8.57% returns on average
                  </p>
                </div>
                
                <div className="text-center p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <h4 className="font-semibold text-destructive mb-2">False Penalties</h4>
                  <p className="text-sm text-destructive/80">
                    Wrong votes lose stakes and reputation
                  </p>
                </div>
                
                <div className="text-center p-6 bg-verity-blue/10 border border-verity-blue/20 rounded-lg">
                  <Shield className="w-8 h-8 text-verity-blue mx-auto mb-3" />
                  <h4 className="font-semibold text-verity-blue mb-2">Quality Content</h4>
                  <p className="text-sm text-verity-blue/80">
                    High-quality posts attract more stakes
                  </p>
                </div>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Game Theory Analysis
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Nash Equilibrium</h5>
                    <p className="text-muted-foreground">
                      Truth-telling becomes the dominant strategy when rewards exceed the cost of research and verification.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Anti-Gaming Measures</h5>
                    <p className="text-muted-foreground">
                      Reputation weighting and diminishing returns prevent coordinated attacks and manipulation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mechanisms;