import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, TrendingUp, Zap, ArrowRight } from "lucide-react";
import verityLogo from "@/assets/verity-logo.png";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/10"
    >
      {/* Verity Logo Background */}
      <div 
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${verityLogo})` }}
      />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Blockchain & Community Truth
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            The Future of
            <span className="block gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Verified News
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Join a decentralized community where truth prevails through blockchain verification, 
            token incentives, and collective wisdom. Combat misinformation together.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="p-4 bg-card/50 border border-border rounded-lg">
              <Shield className="w-8 h-8 mb-2 mx-auto text-primary" />
              <div className="text-2xl font-bold text-foreground">98.5%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="p-4 bg-card/50 border border-border rounded-lg">
              <Users className="w-8 h-8 mb-2 mx-auto text-primary" />
              <div className="text-2xl font-bold text-foreground">25K+</div>
              <div className="text-sm text-muted-foreground">Verified Members</div>
            </div>
            <div className="p-4 bg-card/50 border border-border rounded-lg">
              <TrendingUp className="w-8 h-8 mb-2 mx-auto text-primary" />
              <div className="text-2xl font-bold text-foreground">1.2M</div>
              <div className="text-sm text-muted-foreground">VRT in Circulation</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green text-white shadow-xl shadow-verity-blue/25 text-lg px-8"
            >
              Start Verifying Truth
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8"
              onClick={() => navigate("/launch")}
            >
              Learn About VRT
            </Button>
          </div>

          {/* Key Features */}
          <div className="mt-12 text-muted-foreground">
            <p className="text-sm mb-4">
              ✓ Earn VRT tokens for accurate verification ✓ Stake on claims you believe in ✓ Build reputation through truth
            </p>
          </div>
        </div>
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
    </section>
  );
};