import { useState, useMemo } from "react";
import { mockCandidates } from "@/data/mockCandidates";
import { KanbanColumn } from "@/components/Kanban/KanbanColumn";
import { FilterPanel, FilterValues } from "@/components/Filters/FilterPanel";
import { AIAssistant } from "@/components/AI/AIAssistant";
import { ProfileModal } from "@/components/Candidates/ProfileModal";
import { Candidate } from "@/types/candidate";

const stages = [
  { id: "new", label: "New", color: "muted" },
  { id: "ai-queue", label: "AI Queue", color: "secondary" },
  { id: "qualified", label: "Qualified", color: "primary" },
  { id: "interview", label: "Interview", color: "warning" },
  { id: "offer", label: "Offer", color: "success" },
];

export const Kanban = () => {
  const [candidates] = useState(mockCandidates);
  const [filters, setFilters] = useState<FilterValues>({});
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate: Candidate) => {
      if (filters.jobOpeningId && filters.jobOpeningId !== "all" && candidate.job_opening_id !== filters.jobOpeningId) {
        return false;
      }
      if (filters.recruiterId && filters.recruiterId !== "all" && candidate.recruiter_id !== filters.recruiterId) {
        return false;
      }
      if (filters.location && filters.location !== "all" && candidate.location !== filters.location) {
        return false;
      }
      if (filters.source && filters.source !== "all" && candidate.source !== filters.source) {
        return false;
      }
      if (filters.dateFrom && candidate.applied_date) {
        const appliedDate = new Date(candidate.applied_date);
        if (appliedDate < filters.dateFrom) return false;
      }
      if (filters.dateTo && candidate.applied_date) {
        const appliedDate = new Date(candidate.applied_date);
        if (appliedDate > filters.dateTo) return false;
      }
      return true;
    });
  }, [candidates, filters]);

  const getCandidatesByStage = (stageId: string) => {
    const statusMap: Record<string, string[]> = {
      "new": ["New"],
      "ai-queue": ["AI Queue"],
      "qualified": ["Qualified"],
      "interview": ["Interview"],
      "offer": ["Offer"],
    };
    
    return filteredCandidates.filter(c => statusMap[stageId]?.includes(c.status));
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold mb-2">Kanban Board</h1>
        <p className="text-muted-foreground">Drag and drop candidates through hiring stages</p>
      </div>

      <FilterPanel onFilterChange={setFilters} showStatus={false} />

      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            candidates={getCandidatesByStage(stage.id)}
            onCandidateClick={setSelectedCandidate}
          />
        ))}
      </div>

      {selectedCandidate && (
        <ProfileModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      <AIAssistant />
    </div>
  );
};
