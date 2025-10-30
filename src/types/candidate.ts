export interface Candidate {
  id: string;
  name: string;
  photo?: string;
  rating: number;
  availability: "Available" | "Notice Period" | "Not Available";
  source: string;
  ai_summary: string;
  skills: string[];
  status: "New" | "AI Queue" | "Qualified" | "Interview" | "Offer" | "Rejected";
  test_status: "Not Sent" | "Sent" | "Completed" | "Failed";
  activity_timeline: Array<{
    time: string;
    event: string;
  }>;
  email?: string;
  phone?: string;
  location?: string;
  job_title?: string;
  matching_score?: number;
  matched_keywords?: string[];
  job_opening_id?: string;
  recruiter_id?: string;
  applied_date?: string;
}

export interface AICallResult {
  call_id: string;
  candidate_id: string;
  transcript: Array<{
    q: string;
    a: string;
  }>;
  scores: {
    technical: number;
    soft: number;
    culture: number;
  };
  suggested_tests: Array<{
    id: string;
    name: string;
  }>;
  ai_notes: string[];
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "error";
  last_run: string;
  logs: Array<{
    t: string;
    msg: string;
  }>;
}
