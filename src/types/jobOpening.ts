export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  status: "Open" | "On Hold" | "Closed";
  positions: number;
  filled: number;
  posted_date: string;
  priority: "High" | "Medium" | "Low";
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  active_jobs: number;
}
