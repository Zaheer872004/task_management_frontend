import { api } from "./client";

export const getTasksApi = () => api.get("/api/v1/tasks/");
export const getTaskByIdApi = (id) => api.get(`/api/v1/tasks/${id}`);
export const createTaskApi = (payload) => api.post("/api/v1/tasks/", payload);
export const updateTaskApi = (id, payload) => api.patch(`/api/v1/tasks/${id}`, payload);
export const deleteTaskApi = (id) => api.delete(`/api/v1/tasks/${id}`);