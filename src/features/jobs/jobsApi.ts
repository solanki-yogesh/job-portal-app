import { axiosInstance } from "../../api/axiosInstance";
import type { Job } from "../../types";

export const fetchJobs = async (): Promise<Job[]> => {
  const res = await axiosInstance.get<Job[]>("/jobs");
  return res.data;
};

export const createJob = async (job: Omit<Job, "id">): Promise<Job> => {
  const res = await axiosInstance.post<Job>("/jobs", job);
  return res.data;
};