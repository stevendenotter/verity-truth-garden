import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Target,
  DollarSign
} from "lucide-react";

export const InvestorPitch = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-verify-gold/10 text-verify-gold border-verify-gold/20">
            <Target className="w-4 h-4 mr-2" />
            Investment Opportunity
          </Badge>
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            The Future of Information is Decentralized
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Verity combines cutting-edge blockchain technology with human wisdom to create 
            the first truly trustless truth verification platform. Join us in building a world 
            where accurate information is rewarded and misinformation has no place.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Value Proposition */}
          <Card className="glass-card border-l-4 border-l-verity-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-verity-blue" />
                Lovable & Scalable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-trust-green mt-2" />
                <div>
                  <h4 className="font-semibold mb-1">Community-Driven Truth</h4>
                  <p className="text-sm text-muted-foreground">
                    A warm, engaging platform where users feel empowered to contribute to truth-seeking
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-verify-gold mt-2" />
                <div>
                  <h4 className="font-semibold mb-1">Tokenized Economy</h4>
                  <p className="text-sm text-muted-foreground">
                    VRT tokens create sustainable incentives for accurate verification and quality content
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-verity-blue mt-2" />
                <div>
                  <h4 className="font-semibold mb-1">Viral Growth Potential</h4>
                  <p className="text-sm text-muted-foreground">
                    Built-in referral system (5 VRT per active referral) drives organic user acquisition
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Impact */}
          <Card className="glass-card border-l-4 border-l-trust-green">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-trust-green" />
                Social Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-trust-green mt-2" />
                <div>
                  <h4 className="font-semibold mb-1">Combat Misinformation</h4>
                  <p className="text-sm text-muted-foreground">
                    Directly addresses the $78B annual cost of misinformation to society
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-verity-blue mt-2" />
                <div>
                  <h4 className="font-semibold mb-1">ESG-Aligned</h4>
                  <p className="text-sm text-muted-foreground">
                    Appeals to impact investors focused on social governance and digital democracy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-verify-gold mt-2" />
                <div>
                  <h4 className="font-semibold mb-1">Global Scalability</h4>
                  <p className="text-sm text-muted-foreground">
                    Language-agnostic blockchain technology enables worldwide deployment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Economics */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-verify-gold" />
              VRT Token Distribution (100M Total Supply)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-trust-green/10 border border-trust-green/20">
                <div className="text-2xl font-bold text-trust-green mb-1">50%</div>
                <div className="text-sm text-trust-green">Community</div>
                <div className="text-xs text-muted-foreground mt-1">Airdrops, rewards, referrals</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-verity-blue/10 border border-verity-blue/20">
                <div className="text-2xl font-bold text-verity-blue mb-1">20%</div>
                <div className="text-sm text-verity-blue">Team</div>
                <div className="text-xs text-muted-foreground mt-1">3-year vesting</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-verify-gold/10 border border-verify-gold/20">
                <div className="text-2xl font-bold text-verify-gold mb-1">20%</div>
                <div className="text-sm text-verify-gold">Development</div>
                <div className="text-xs text-muted-foreground mt-1">Marketing & operations</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="text-2xl font-bold text-destructive mb-1">10%</div>
                <div className="text-sm text-destructive">Investors</div>
                <div className="text-xs text-muted-foreground mt-1">2-year vesting</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-verity-blue/10 to-trust-green/10 border border-verity-blue/20">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-1">Ready to Invest in Truth?</h3>
              <p className="text-sm text-muted-foreground">
                Join our seed round and help build the future of verified information
              </p>
            </div>
            <Button className="bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green text-white shadow-lg">
              <DollarSign className="w-4 h-4 mr-2" />
              Contact Investors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};