import { Star, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types/candidate";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onClick?: () => void;
  onViewProfile?: () => void;
}

export const CandidateCard = ({ candidate, onClick, onViewProfile }: CandidateCardProps) => {
  const isAutoQueued = candidate.rating === 5 && candidate.availability === "Available";
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-effect rounded-xl p-6 transition-smooth hover:shadow-glow cursor-pointer relative overflow-hidden",
        isAutoQueued && "ring-2 ring-primary"
      )}
    >
      {isAutoQueued && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Auto-queued
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold">
          {candidate.photo ? (
            <img src={candidate.photo} alt={candidate.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            candidate.name.charAt(0)
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{candidate.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < candidate.rating ? "fill-warning text-warning" : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <Badge variant={candidate.availability === "Available" ? "default" : "secondary"}>
                  {candidate.availability}
                </Badge>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{candidate.ai_summary}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {candidate.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {candidate.location || "Location not specified"}
            </div>
            <Badge
              variant={
                candidate.status === "AI Queue"
                  ? "default"
                  : candidate.status === "Qualified"
                  ? "default"
                  : "secondary"
              }
            >
              {candidate.status}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex gap-2">
        <Button 
          size="sm" 
          variant="default" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile?.();
          }}
        >
          View Profile
        </Button>
        {candidate.status === "New" && (
          <Button size="sm" variant="outline" className="flex-1">
            Pass to AI
          </Button>
        )}
      </div>
    </div>
  );
};
