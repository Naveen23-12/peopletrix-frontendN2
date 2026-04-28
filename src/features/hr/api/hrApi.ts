import { MainAPI } from "../../../services/apiConfig";

export type CustomFieldPayload = {
  fieldKey: string;
  fieldLabel: string;
  fieldType: string;
  required: boolean;
};

export type LeavePolicyPayload = {
  leavePolicy: {
    name: string;
    code: string;
    totalDaysPerYear: number;
  }[];
  totalLeaves?: number;
};

export type HolidayPolicyPayload = {
  name: string;
  year: number;
  holidays: {
    name: string;
    date: Date;
    day: string;
    type: string;
  }[];
};

export type AttendancePolicyPayload = {
  workingHours: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
};

export const getCustomFieldsAPI = () => {
  return MainAPI.get("/organization/custom-fields");
};

export const createCustomFieldAPI = (data: CustomFieldPayload) => {
  return MainAPI.post("/organization/custom-fields", data);
};

export const createLeavePolicyAPI = (data: LeavePolicyPayload) => {
  return MainAPI.post("/leave", data);
};

export const createHolidayPolicyAPI = (data: HolidayPolicyPayload) => {
  return MainAPI.post("/holiday/policy", data);
};

export const createAttendancePolicyAPI = (data: AttendancePolicyPayload) => {
  return MainAPI.post("/attendance/policy", data);
};