import { api } from "./client";

export const registerApi = (payload) => api.post("/api/v1/auth/register", payload);
export const loginApi = (payload) => api.post("/api/v1/auth/login", payload);
export const logoutApi = () => api.post("/api/v1/auth/logout");
export const meApi = () => api.get("/api/v1/auth/me");
export const usersApi = () => api.get("/api/v1/auth/users");