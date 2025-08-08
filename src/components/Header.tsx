import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Wallet, Shield, Vote } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  vrtBalance: number;
  reputation: number;
  onConnectWallet: () => void;
  onSubmitPost: () => void;
}

export const Header = ({ vrtBalance, reputation, onConnectWallet, onSubmitPost }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-verity-blue to-trust-green flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Verity</h1>
              <p className="text-xs text-muted-foreground">Decentralized Truth</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                className="pl-10 bg-background/50 border-border/50 focus:border-verity-blue"
                placeholder="Search for claims, news, or topics..."
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* VRT Balance */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-verify-gold/10 border border-verify-gold/20">
              <Wallet className="w-4 h-4 text-verify-gold" />
              <span className="font-semibold text-verify-gold">{vrtBalance.toFixed(2)} VRT</span>
            </div>

            {/* Reputation Score */}
            <div className="flex items-center space-x-2">
              <Vote className="w-4 h-4 text-trust-green" />
              <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20">
                Rep: {reputation}
              </Badge>
            </div>

            {/* Submit Post Button */}
            <Button 
              onClick={onSubmitPost}
              className="bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Claim
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};