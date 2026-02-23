import { axiosInstance } from "../../api/axiosInstance";
import type { Application } from "../../types";

export const fetchApplications = async (): Promise<Application[]> => {
  const res = await axiosInstance.get<Application[]>("/applications");
  return res.data;
};

export const fetchApplicationsByJob = async (
  jobId: number
): Promise<Application[]> => {
  const res = await axiosInstance.get<Application[]>(
    `/applications?jobId=${jobId}`
  );
  return res.data;
};

export const applyJob = async (
  jobId: number,
  userId: number
): Promise<Application> => {
  const res = await axiosInstance.post<Application>("/applications", {
    jobId,
    userId,
    appliedDate: new Date().toISOString(),
  });

  return res.data;
};