import axios from "axios";

export const API_BASE_URL = "http://localhost:3000/api/v1";

export const MainAPI = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const HrAPI = axios.create({
  baseURL: `${API_BASE_URL}/hr`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const EmployeeAPI = axios.create({
  baseURL: `${API_BASE_URL}/employee`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

MainAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

HrAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

EmployeeAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});