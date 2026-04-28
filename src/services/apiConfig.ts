import axios from "axios";

export const API_BASE_URL = "http://localhost:3000/api/v1";

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