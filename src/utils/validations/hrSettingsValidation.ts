/* ================= SET EMPLOYEE CUSTOM FIELDS ================= */

export type CustomFieldInput = {
  fieldKey: string;
  fieldLabel: string;
  fieldType: "string";
  required: boolean;
};

export const validateCustomFields = (fields: CustomFieldInput[]) => {
  const hasEmpty = fields.some((field) => !field.fieldLabel.trim());

  if (hasEmpty) {
    return "All field names must be filled in";
  }

  const labels = fields.map((field) =>
    field.fieldLabel.trim().toLowerCase()
  );

  const hasDuplicates = labels.length !== new Set(labels).size;

  if (hasDuplicates) {
    return "Field names must be unique";
  }

  return "";
};

export const generateFieldKey = (label: string) => {
  return label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

/* ================= SET LEAVE POLICY ================= */

export type LeaveTypeInput = {
  name: string;
  code: string;
  totalDaysPerYear: number;
};

export const validateLeavePolicy = (leaveTypes: LeaveTypeInput[]) => {
  const hasEmpty = leaveTypes.some(
    (leave) => !leave.name.trim() || !leave.totalDaysPerYear
  );

  if (hasEmpty) {
    return "Fill in all leave type names and days";
  }

  const hasZero = leaveTypes.some(
    (leave) => Number(leave.totalDaysPerYear) <= 0
  );

  if (hasZero) {
    return "Days must be greater than 0";
  }

  return "";
};

export const generateLeaveCode = (leaveName: string) => {
  return leaveName
    .toUpperCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z0-9_]/g, "");
};

/* ================= SET HOLIDAY ================= */

export type HolidayInput = {
  name: string;
  date: string;
};

export const validateHolidayPolicy = (holidays: HolidayInput[]) => {
  const hasEmpty = holidays.some(
    (holiday) => !holiday.name.trim() || !holiday.date
  );

  if (hasEmpty) {
    return "Fill in all holiday names and dates";
  }

  return "";
};

/* ================= SET ATTENDANCE ================= */

export type AttendancePolicyInput = {
  workingHours: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
};

export const validateAttendancePolicy = ({
  workingHours,
  workingDays,
  startTime,
  endTime,
}: AttendancePolicyInput) => {
  if (!workingHours.trim()) {
    return "Please enter working hours";
  }

  if (workingDays.length === 0) {
    return "Please select working days";
  }

  if (!startTime || !endTime) {
    return "Please select start and end time";
  }

  if (startTime >= endTime) {
    return "End time must be greater than start time";
  }

  return "";
};