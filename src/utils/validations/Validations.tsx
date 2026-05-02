import * as Yup from "yup";

/* ================= LOGIN ================= */

export type LoginFormInputs = {
  role: string;
  name: string;
  password: string;
};

export const loginSchema = Yup.object({
  role: Yup.string()
    .required("Please select a role")
    .notOneOf([""], "Please select a valid role")
    .oneOf(["Admin", "Employee"], "Please select Admin or Employee"),

  name: Yup.string()
    .required("Login ID is required")
    .min(3, "Must be at least 3 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Min 6 characters"),
});

/* ================= SIGNUP / REGISTER ================= */

export type SignupFormInputs = {
  firstName: string;
  lastName: string;
  loginUrl: string;
  loginId: string;
  password: string;
  organizationName: string;
  organizationDomain: string;
  orgCode?: string;
};

export const signupSchema: Yup.ObjectSchema<SignupFormInputs> = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
    .min(2, "Must be at least 2 characters"),

  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
    .min(2, "Must be at least 2 characters"),

  loginUrl: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),

  loginId: Yup.string()
    .required("Login ID is required")
    .min(3, "Must be at least 3 characters"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
      "Min 6 chars, includes letters & numbers"
    ),

  organizationName: Yup.string()
    .required("Organization Name is required")
    .min(2, "Must be at least 2 characters"),

  organizationDomain: Yup.string()
    .required("Organization Domain is required")
    .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid domain"),

  orgCode: Yup.string().default(""),
});

/* ================= FORGOT PASSWORD ================= */

export type ForgetPasswordFormInputs = {
  email: string;
};

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
});

/* ================= VERIFY CODE / CHECK EMAIL ================= */

export type CheckEmailFormInputs = {
  code: string;
};

export const checkEmailSchema = Yup.object({
  code: Yup.string()
    .required("OTP is required")
    .length(6, "Enter 6-digit OTP")
    .matches(/^\d{6}$/, "Enter only numbers"),
});

/* ================= SET / UPDATE PASSWORD ================= */

export type SetPasswordFormInputs = {
  newPassword: string;
  confirmPassword: string;
};

export const setPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Min 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Must contain letters & numbers"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

/* ================= SMALL HELPERS ================= */

export const validateOtp = (otp: string) => {
  if (!otp.trim()) {
    return "Please enter OTP";
  }

  if (!/^\d+$/.test(otp.trim())) {
    return "OTP must contain only numbers";
  }

  if (otp.trim().length !== 6) {
    return "OTP must be 6 digits";
  }

  return "";
};

/* ================= ADD EMPLOYEE ================= */

export type AddEmployeeFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  designation: string;
  department: string;
};

export const addEmployeeSchema: Yup.ObjectSchema<AddEmployeeFormInputs> =
  Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
      .min(2, "Must be at least 2 characters"),

    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
      .min(2, "Must be at least 2 characters"),

    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),

    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    designation: Yup.string()
      .required("Designation is required")
      .min(2, "Must be at least 2 characters"),

    department: Yup.string()
      .required("Department is required")
      .min(2, "Must be at least 2 characters"),
  });

export const normalizeEmail = (email: string) => {
  return email.trim().toLowerCase();
};