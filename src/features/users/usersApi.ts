import { axiosInstance } from "../../api/axiosInstance";
import type { User } from "../../types";

export const fetchUsers = async (): Promise<User[]> => {
    const res = await axiosInstance.get<User[]>("/users");
    return res.data;
};
