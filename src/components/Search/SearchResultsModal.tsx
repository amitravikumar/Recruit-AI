import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, MapPin, Briefcase, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface SearchCandidate {
  id: string;
  name: string;
  title: string;
  location: string;
  source: string;
  matchScore: number;
  skills: string[];
  experience: string;
  availability: string;
}

interface SearchResultsModalProps {
  open: boolean;
  onClose: () => void;
  searchQuery: string;
}

const mockSearchResults: SearchCandidate[] = [
  {
    id: "sr_001",
    name: "Alex Thompson",
    title: "Digital Marketing Manager",
    location: "Dubai, UAE",
    source: "LinkedIn",
    matchScore: 95,
    skills: ["Digital Marketing", "SEO", "SEM", "Social Media", "Analytics"],
    experience: "8 years",
    availability: "Available",
  },
  {
    id: "sr_002",
    name: "Sara Ahmed",
    title: "Senior Digital Marketing Specialist",
    location: "Abu Dhabi, UAE",
    source: "Naukri Gulf",
    matchScore: 92,
    skills: ["Content Marketing", "Email Campaigns", "PPC", "Digital Strategy"],
    experience: "6 years",
    availability: "Available in 2 weeks",
  },
  {
    id: "sr_003",
    name: "Mohammed Hassan",
    title: "Digital Marketing Lead",
    location: "Sharjah, UAE",
    source: "Indeed",
    matchScore: 88,
    skills: ["Marketing Automation", "Lead Generation", "CRM", "Analytics"],
    experience: "7 years",
    availability: "Available",
  },
  {
    id: "sr_004",
    name: "Fatima Ali",
    title: "Performance Marketing Specialist",
    location: "Dubai, UAE",
    source: "LinkedIn",
    matchScore: 85,
    skills: ["Google Ads", "Facebook Ads", "Conversion Optimization", "A/B Testing"],
    experience: "5 years",
    availability: "Available",
  },
  {
    id: "sr_005",
    name: "Khalid Rahman",
    title: "Digital Marketing Coordinator",
    location: "Dubai, UAE",
    source: "Bayt",
    matchScore: 82,
    skills: ["Social Media Marketing", "Content Creation", "Brand Management"],
    experience: "4 years",
    availability: "Immediate",
  },
];

export const SearchResultsModal = ({ open, onClose, searchQuery }: SearchResultsModalProps) => {
  const [passingToQueue, setPassingToQueue] = useState<string | null>(null);

  const handlePassToAIQueue = (candidate: SearchCandidate) => {
    setPassingToQueue(candidate.id);
    setTimeout(() => {
      toast.success(`${candidate.name} passed to AI Queue!`, {
        description: "Candidate will be screened by AI shortly"
      });
      setPassingToQueue(null);
    }, 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "outline" => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-2xl">
            Search Results for "{searchQuery}"
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Found {mockSearchResults.length} matching candidates across all job boards
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-6 space-y-4">
            {mockSearchResults.map((candidate) => (
              <Card key={candidate.id} className="p-6 glass-effect hover:shadow-glow transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{candidate.name}</h3>
                          <Badge variant={getScoreBadgeVariant(candidate.matchScore)}>
                            <Star className="w-3 h-3 mr-1" />
                            {candidate.matchScore}% Match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {candidate.title}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {candidate.location}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handlePassToAIQueue(candidate)}
                        disabled={passingToQueue === candidate.id}
                        className="gap-2"
                      >
                        {passingToQueue === candidate.id ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Passing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Pass to AI Queue
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Source</p>
                        <Badge variant="outline">{candidate.source}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Experience</p>
                        <p className="text-sm font-medium">{candidate.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Availability</p>
                        <p className="text-sm font-medium text-success">{candidate.availability}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-primary/10 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-primary mb-1">AI Match Insights</p>
                          <p className="text-xs text-muted-foreground">
                            Strong alignment with job requirements. {candidate.matchScore >= 90 ? "Highly recommended" : "Good fit"} for digital marketing role.
                            {candidate.matchScore >= 90 && " Excellent skill match and experience level."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border flex justify-between items-center flex-shrink-0">
          <p className="text-sm text-muted-foreground">
            {mockSearchResults.filter(c => c.matchScore >= 90).length} high-quality matches (≥90%)
          </p>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
