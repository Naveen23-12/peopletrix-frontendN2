import * as Yup from "yup";

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