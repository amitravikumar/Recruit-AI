import { useState, useMemo } from "react";
import { CandidateCard } from "@/components/Candidates/CandidateCard";
import { ProfileModal } from "@/components/Candidates/ProfileModal";
import { SourceFlowModal } from "@/components/Candidates/SourceFlowModal";
import { mockCandidates } from "@/data/mockCandidates";
import { Button } from "@/components/ui/button";
import { Plus, Info } from "lucide-react";
import { Candidate } from "@/types/candidate";
import { FilterPanel, FilterValues } from "@/components/Filters/FilterPanel";
import { AIAssistant } from "@/components/AI/AIAssistant";

export const Candidates = () => {
  const [candidates] = useState(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});

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
      if (filters.status && filters.status !== "all" && candidate.status !== filters.status) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Candidates</h1>
          <p className="text-muted-foreground">Manage and review all candidates</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowFlowModal(true)}>
            <Info className="w-4 h-4 mr-2" />
            How it Works
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      <FilterPanel onFilterChange={setFilters} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate}
            onViewProfile={() => setSelectedCandidate(candidate)}
          />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No candidates match the selected filters</p>
        </div>
      )}

      {selectedCandidate && (
        <ProfileModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {showFlowModal && (
        <SourceFlowModal onClose={() => setShowFlowModal(false)} />
      )}

      <AIAssistant />
    </div>
  );
};
