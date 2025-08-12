import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  rewardPool: number;
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
  const initials = post.author
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/30 hover:border-border/50 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted text-foreground/70 text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant="outline" className="text-xs border-border/40">
                {post.category}
              </Badge>
              {getVerificationBadge()}
              <span className="text-xs text-muted-foreground">
                {post.timestamp}
              </span>
            </div>
            <h3 className="font-medium text-base leading-tight mb-1 text-foreground">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{post.author}</span>
              <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20 text-xs">
                Rep: {post.authorReputation}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground/80 mb-3 line-clamp-2 text-sm">
          {post.content}
        </p>

        {/* Consensus & Reward Info */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              Consensus: <span className="text-verity-blue font-medium">{consensusPercentage.toFixed(1)}%</span>
            </span>
            <span className="text-muted-foreground">
              <DollarSign className="w-3 h-3 inline text-verify-gold" />
              <span className="text-verify-gold font-medium">{post.vrtStaked} VRT</span>
            </span>
            <span className="text-muted-foreground">
              Reward: <span className="text-trust-green font-medium">{post.rewardPool.toFixed(1)} VRT</span>
            </span>
          </div>
          <div className="text-muted-foreground">
            {post.votesFor + post.votesAgainst} votes
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onVote(post.id, true)}
              className="text-trust-green hover:bg-trust-green/10 border-trust-green/30 text-xs px-2 py-1 h-7"
            >
              <ArrowUp className="w-3 h-3 mr-1" />
              Verify ({post.votesFor})
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onVote(post.id, false)}
              className="text-destructive hover:bg-destructive/10 border-destructive/30 text-xs px-2 py-1 h-7"
            >
              <ArrowDown className="w-3 h-3 mr-1" />
              Dispute ({post.votesAgainst})
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStake(post.id)}
              className="text-verify-gold hover:bg-verify-gold/10 border-verify-gold/30 text-xs px-2 py-1 h-7"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Stake
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7">
              <MessageCircle className="w-3 h-3 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};