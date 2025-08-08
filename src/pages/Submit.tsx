import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Link, AlertCircle, CheckCircle, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [sources, setSources] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addSource = () => {
    setSources([...sources, ""]);
  };

  const updateSource = (index: number, value: string) => {
    const newSources = [...sources];
    newSources[index] = value;
    setSources(newSources);
  };

  const removeSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Claim Submitted Successfully!",
      description: "Your claim has been posted for community verification. 1 VRT has been deducted."
    });

    // Navigate back to home
    navigate("/");
    setIsSubmitting(false);
  };

  const categories = [
    "Breaking News",
    "Politics", 
    "Science",
    "Technology",
    "Health",
    "Climate",
    "Economics",
    "Social Issues",
    "Education",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">Submit a Truth Claim</h1>
          <p className="text-muted-foreground">
            Share a factual claim for community verification. Requires 1 VRT to post.
          </p>
        </div>

        {/* Cost Notice */}
        <Alert className="mb-8">
          <DollarSign className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Posting this claim will cost <strong>1 VRT</strong> from your balance.</span>
            <Badge className="bg-verify-gold/10 text-verify-gold border-verify-gold/20">
              Balance: 125.50 VRT
            </Badge>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Claim Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Claim Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Study: Mediterranean Diet Reduces Heart Disease Risk by 30%"
                  required
                  maxLength={200}
                />
                <p className="text-sm text-muted-foreground">
                  {title.length}/200 characters
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Detailed Description *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Provide detailed information about your claim. Include context, methodology, and key findings..."
                  required
                  rows={6}
                  maxLength={2000}
                />
                <p className="text-sm text-muted-foreground">
                  {content.length}/2000 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Supporting Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add credible sources to support your claim. Quality sources improve verification likelihood.
              </p>
              
              {sources.map((source, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={source}
                    onChange={(e) => updateSource(index, e.target.value)}
                    placeholder="https://example.com/article"
                    type="url"
                  />
                  {sources.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeSource(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addSource}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Source
              </Button>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-trust-green" />
                Submission Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-trust-green">✓ Good Claims:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Factual and verifiable statements</li>
                    <li>• Clear, specific information</li>
                    <li>• Recent developments or studies</li>
                    <li>• Include credible sources</li>
                    <li>• Neutral, objective tone</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">✗ Avoid:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Opinions or subjective statements</li>
                    <li>• Unverifiable claims</li>
                    <li>• Hate speech or harassment</li>
                    <li>• Spam or promotional content</li>
                    <li>• Misinformation or hoaxes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              disabled={!title || !content || !category || isSubmitting}
              className="bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Claim (1 VRT)
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Submit;