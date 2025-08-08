import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Coins, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  currentStake: number;
  userBalance: number;
  onStake: (amount: number, side: 'verify' | 'dispute') => void;
}

export const StakingModal = ({ 
  isOpen, 
  onClose, 
  postTitle, 
  currentStake, 
  userBalance, 
  onStake 
}: StakingModalProps) => {
  const [stakeAmount, setStakeAmount] = useState([10]);
  const [stakeSide, setStakeSide] = useState<'verify' | 'dispute'>('verify');
  
  const handleStake = () => {
    onStake(stakeAmount[0], stakeSide);
    onClose();
  };

  const potentialReward = stakeAmount[0] * 0.857; // Based on whitepaper example

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-verify-gold" />
            Stake VRT Tokens
          </DialogTitle>
          <DialogDescription>
            Stake your VRT tokens to vote on this claim's truthfulness
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Post Info */}
          <div className="p-3 rounded-lg bg-muted/30 border">
            <h4 className="font-medium text-sm mb-1">Claim:</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{postTitle}</p>
          </div>

          {/* Current Stakes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-trust-green/10 border border-trust-green/20">
              <div className="text-lg font-semibold text-trust-green">{currentStake}</div>
              <div className="text-xs text-trust-green">VRT Verifying</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="text-lg font-semibold text-destructive">245</div>
              <div className="text-xs text-destructive">VRT Disputing</div>
            </div>
          </div>

          {/* Stake Side Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Your Position</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={stakeSide === 'verify' ? 'default' : 'outline'}
                onClick={() => setStakeSide('verify')}
                className={stakeSide === 'verify' 
                  ? 'bg-trust-green hover:bg-trust-green/90 text-white' 
                  : 'border-trust-green/30 text-trust-green hover:bg-trust-green/10'
                }
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify True
              </Button>
              <Button
                variant={stakeSide === 'dispute' ? 'default' : 'outline'}
                onClick={() => setStakeSide('dispute')}
                className={stakeSide === 'dispute' 
                  ? 'bg-destructive hover:bg-destructive/90 text-white' 
                  : 'border-destructive/30 text-destructive hover:bg-destructive/10'
                }
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Dispute False
              </Button>
            </div>
          </div>

          {/* Stake Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Stake Amount</Label>
              <Badge variant="secondary" className="bg-verify-gold/10 text-verify-gold border-verify-gold/20">
                Balance: {userBalance} VRT
              </Badge>
            </div>
            
            <div className="space-y-4">
              <Slider
                value={stakeAmount}
                onValueChange={setStakeAmount}
                max={Math.min(userBalance, 100)}
                min={1}
                step={1}
                className="w-full"
              />
              
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={stakeAmount[0]}
                  onChange={(e) => setStakeAmount([Number(e.target.value)])}
                  max={userBalance}
                  min={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">VRT</span>
              </div>
            </div>
          </div>

          {/* Potential Reward */}
          <div className="p-3 rounded-lg bg-verify-gold/10 border border-verify-gold/20">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-verify-gold">Potential Reward:</span>
              <span className="font-semibold text-verify-gold">+{potentialReward.toFixed(2)} VRT</span>
            </div>
            <p className="text-xs text-verify-gold/80 mt-1">
              If your position wins consensus (0.857 VRT per token staked)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleStake} 
              className="flex-1 bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Stake {stakeAmount[0]} VRT
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};