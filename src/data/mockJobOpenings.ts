import { JobOpening, Recruiter } from "@/types/jobOpening";

export const mockJobOpenings: JobOpening[] = [
  {
    id: "job_001",
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full-time",
    status: "Open",
    positions: 2,
    filled: 0,
    posted_date: "2025-10-15",
    priority: "High"
  },
  {
    id: "job_002",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    status: "Open",
    positions: 3,
    filled: 1,
    posted_date: "2025-10-20",
    priority: "High"
  },
  {
    id: "job_003",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full-time",
    status: "Open",
    positions: 1,
    filled: 0,
    posted_date: "2025-10-18",
    priority: "Medium"
  },
  {
    id: "job_004",
    title: "Data Engineer",
    department: "Data & Analytics",
    location: "Dubai, UAE",
    type: "Full-time",
    status: "Open",
    positions: 2,
    filled: 0,
    posted_date: "2025-10-22",
    priority: "High"
  }
];

export const mockRecruiters: Recruiter[] = [
  {
    id: "rec_001",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    active_jobs: 3
  },
  {
    id: "rec_002",
    name: "Ahmed Hassan",
    email: "ahmed.h@company.com",
    active_jobs: 2
  },
  {
    id: "rec_003",
    name: "Lisa Chen",
    email: "lisa.c@company.com",
    active_jobs: 1
  }
];
