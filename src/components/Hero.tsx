import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, TrendingUp, Zap, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Blockchain & Community Truth
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            The Future of
            <span className="block gradient-text bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 bg-clip-text text-transparent">
              Verified News
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join a decentralized community where truth prevails through blockchain verification, 
            token incentives, and collective wisdom. Combat misinformation together.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="glass-card p-4 bg-white/10 border-white/20 text-white">
              <Shield className="w-8 h-8 mb-2 mx-auto text-blue-200" />
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-sm opacity-90">Accuracy Rate</div>
            </div>
            <div className="glass-card p-4 bg-white/10 border-white/20 text-white">
              <Users className="w-8 h-8 mb-2 mx-auto text-green-200" />
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm opacity-90">Verified Members</div>
            </div>
            <div className="glass-card p-4 bg-white/10 border-white/20 text-white">
              <TrendingUp className="w-8 h-8 mb-2 mx-auto text-yellow-200" />
              <div className="text-2xl font-bold">1.2M</div>
              <div className="text-sm opacity-90">VRT in Circulation</div>
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
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8"
            >
              Learn About VRT
            </Button>
          </div>

          {/* Key Features */}
          <div className="mt-12 text-gray-300">
            <p className="text-sm mb-4 opacity-90">
              ✓ Earn VRT tokens for accurate verification ✓ Stake on claims you believe in ✓ Build reputation through truth
            </p>
          </div>
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
    </section>
  );
};