import { useState, useMemo } from "react";
import { mockCandidates } from "@/data/mockCandidates";
import { CandidateCard } from "@/components/Candidates/CandidateCard";
import { ProfileModal } from "@/components/Candidates/ProfileModal";
import { AICallModal } from "@/components/AI/AICallModal";
import { Candidate } from "@/types/candidate";
import { FilterPanel, FilterValues } from "@/components/Filters/FilterPanel";
import { AIAssistant } from "@/components/AI/AIAssistant";

export const AIQueue = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedForCall, setSelectedForCall] = useState<Candidate | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});

  const queuedCandidates = useMemo(() => {
    return mockCandidates.filter((c) => {
      if (c.status !== "AI Queue") return false;
      
      if (filters.jobOpeningId && filters.jobOpeningId !== "all" && c.job_opening_id !== filters.jobOpeningId) {
        return false;
      }
      if (filters.recruiterId && filters.recruiterId !== "all" && c.recruiter_id !== filters.recruiterId) {
        return false;
      }
      if (filters.location && filters.location !== "all" && c.location !== filters.location) {
        return false;
      }
      if (filters.source && filters.source !== "all" && c.source !== filters.source) {
        return false;
      }
      if (filters.dateFrom && c.applied_date) {
        const appliedDate = new Date(c.applied_date);
        if (appliedDate < filters.dateFrom) return false;
      }
      if (filters.dateTo && c.applied_date) {
        const appliedDate = new Date(c.applied_date);
        if (appliedDate > filters.dateTo) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Queue</h1>
        <p className="text-muted-foreground">
          {queuedCandidates.length} candidates ready for AI screening
        </p>
      </div>

      <FilterPanel onFilterChange={setFilters} showStatus={false} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {queuedCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onClick={() => setSelectedForCall(candidate)}
            onViewProfile={() => setSelectedCandidate(candidate)}
          />
        ))}
      </div>

      {selectedCandidate && (
        <ProfileModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {selectedForCall && (
        <AICallModal
          candidate={selectedForCall}
          onClose={() => setSelectedForCall(null)}
        />
      )}

      <AIAssistant />
    </div>
  );
};
