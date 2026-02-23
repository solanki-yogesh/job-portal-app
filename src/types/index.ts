export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "candidate";
}

export type AuthUser = Omit<User, "password">;

export interface Job {
  id: number;
  title: string;
  description: string;
  daysRemaining: number;
}

export interface Application {
  id: number;
  jobId: number;
  userId: number;
  appliedDate: string;
}