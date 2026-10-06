export type Currency = "UZS" | "USD";
export type SearchMode = "candidate" | "employer";

export interface WorkerProfile {
  id: string;
  fullName: string;
  profession: string;
  skills: string[];
  experienceYears: number;
  city: string;
  phone: string;
  telegram?: string;
  expectedSalary?: number;
  currency: Currency;
  bio: string;
  isAvailableForHire: boolean;
}

export interface JobPosting {
  id: string;
  title: string;
  companyName: string;
  city: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency: Currency;
  description: string;
  phone: string;
  telegram?: string;
  createdAt: string;
}

export interface DirectMessage {
  workerId: string;
  employerPhone: string;
  message: string;
}

export interface EmployerProfile {
  id: string;
  companyName: string;
  city: string;
  phone: string;
  telegram?: string;
  description: string;
  verified: boolean;
}
