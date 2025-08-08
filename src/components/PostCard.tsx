import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  Share2, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  DollarSign
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorReputation: number;
  timestamp: string;
  category: string;
  verificationStatus: 'verified' | 'pending' | 'disputed';
  vrtStaked: number;
  votesFor: number;
  votesAgainst: number;
  comments: number;
  consensusScore: number;
}

interface PostCardProps {
  post: Post;
  onVote: (postId: string, isUpvote: boolean) => void;
  onStake: (postId: string) => void;
}

export const PostCard = ({ post, onVote, onStake }: PostCardProps) => {
  const getVerificationBadge = () => {
    switch (post.verificationStatus) {
      case 'verified':
        return (
          <Badge className="trust-verified">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="trust-pending">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'disputed':
        return (
          <Badge className="trust-disputed">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Disputed
          </Badge>
        );
    }
  };

  const consensusPercentage = (post.votesFor / (post.votesFor + post.votesAgainst)) * 100;

  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-verity-blue">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
              {getVerificationBadge()}
              <span className="text-xs text-muted-foreground">
                {post.timestamp}
              </span>
            </div>
            <h3 className="font-semibold text-lg leading-tight mb-2 hover:text-verity-blue cursor-pointer">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>by {post.author}</span>
              <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20">
                Rep: {post.authorReputation}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground/90 mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Consensus Meter */}
        <div className="mb-4 p-3 rounded-lg bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Truth Consensus</span>
            <span className="text-sm font-semibold text-verity-blue">
              {consensusPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={consensusPercentage} 
            className="h-2 bg-muted"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{post.votesFor} verify</span>
            <span>{post.votesAgainst} dispute</span>
          </div>
        </div>

        {/* Staking Info */}
        <div className="flex items-center gap-4 mb-4 p-2 rounded bg-verify-gold/5 border border-verify-gold/20">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-verify-gold" />
            <span className="text-sm font-medium text-verify-gold">
              {post.vrtStaked} VRT Staked
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Voting Buttons */}
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onVote(post.id, true)}
                className="text-trust-green hover:bg-trust-green/10 hover:border-trust-green"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Verify ({post.votesFor})
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onVote(post.id, false)}
                className="text-destructive hover:bg-destructive/10 hover:border-destructive"
              >
                <ArrowDown className="w-4 h-4 mr-1" />
                Dispute ({post.votesAgainst})
              </Button>
            </div>

            {/* Stake Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStake(post.id)}
              className="text-verify-gold hover:bg-verify-gold/10 hover:border-verify-gold"
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Stake VRT
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};