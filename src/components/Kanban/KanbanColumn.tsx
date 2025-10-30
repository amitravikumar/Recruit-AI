import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types/candidate";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  stage: {
    id: string;
    label: string;
    color: string;
  };
  candidates: Candidate[];
  onCandidateClick?: (candidate: Candidate) => void;
}

export const KanbanColumn = ({ stage, candidates, onCandidateClick }: KanbanColumnProps) => {
  const avgScore = candidates.length > 0 ? 78 : 0;

  return (
    <div className="flex-shrink-0 w-80 h-full">
      <div className="glass-effect rounded-lg p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{stage.label}</h3>
            <Badge variant="outline">{candidates.length}</Badge>
          </div>
          {avgScore > 0 && (
            <span className="text-xs text-muted-foreground">Avg: {avgScore}</span>
          )}
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-2">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={cn(
                "glass-effect rounded-lg p-4 cursor-pointer hover:shadow-glow transition-smooth",
                "border-l-4"
              )}
              style={{ borderLeftColor: `hsl(var(--${stage.color}))` }}
              onClick={() => onCandidateClick?.(candidate)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                  {candidate.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">{candidate.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {candidate.ai_summary}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
