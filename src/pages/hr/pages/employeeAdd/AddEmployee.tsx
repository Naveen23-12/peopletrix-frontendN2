import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldErrors, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import Gradient from "../../../../components/common/Gradient";
import { inviteEmployeeAPI } from "../../../../features/hr/api";
import { getAxiosErrorMessage } from "../../../../utils";
import {
  addEmployeeSchema,
  type AddEmployeeFormInputs,
} from "../../../../utils/validations";

type AddEmployeeProps = {
  onClose: () => void;
  onAdded?: () => void;
};

const AddEmployee = ({ onClose, onAdded }: AddEmployeeProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddEmployeeFormInputs>({
    resolver: yupResolver(addEmployeeSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      designation: "",
      department: "",
    },
  });

  const onSubmit: SubmitHandler<AddEmployeeFormInputs> = async (data) => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phoneNumber.trim(),
        designation: data.designation.trim(),
        department: data.department.trim(),
      };

      const response = await inviteEmployeeAPI(payload);
      const result = response.data;

      if (result.success) {
        toast.success("Invite sent to employee email!");
        reset();

        if (onAdded) {
          onAdded();
        }

        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        const message = result.message || "Failed to add employee";
        setError(message);
        toast.error(message);
      }
    } catch (error) {
      console.error("Add employee error:", error);

      const message = getAxiosErrorMessage(
        error,
        "Server error. Check backend."
      );

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: FieldErrors<AddEmployeeFormInputs>) => {
    console.log("Validation errors:", errors);
    toast.error("Please fill all required fields correctly");
  };

  const fields = [
    {
      name: "firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "phoneNumber",
      placeholder: "Phone No",
      type: "text",
    },
    {
      name: "designation",
      placeholder: "Designation",
      type: "text",
    },
    {
      name: "department",
      placeholder: "Department",
      type: "text",
    },
  ] as const;

  return (
    <div className="w-full flex items-center justify-center bg-transparent p-4 sm:p-0">
      <div className="w-full max-w-[95%] sm:max-w-[650px] md:max-w-[700px] lg:w-[50%] rounded-3xl mx-auto relative flex flex-col overflow-hidden bg-[#E9EBF7] px-5 sm:px-10 md:px-14 py-8 sm:py-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-md bg-[#5764B3] hover:bg-[#4a56a0] cursor-pointer transition-all duration-200 hover:scale-110"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Gradient decorations */}
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#5863B2] mb-6 sm:mb-8 shrink-0">
          Add Employee
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4 w-full text-sm z-10">
            {error}
          </div>
        )}

        <form
          id="add-employee-form"
          onSubmit={handleSubmit(onSubmit, onError)}
          className="z-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <input
                  type={field.type}
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  disabled={loading}
                  className="border-2 w-full border-[#5764B3]/50 rounded-xl p-3 sm:p-4 outline-none bg-white text-[#5764B3] placeholder:text-[#5764B3] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />

                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </form>

        <button
          type="submit"
          form="add-employee-form"
          disabled={loading}
          className={`mt-8 w-full sm:w-[300px] mx-auto text-white text-lg sm:text-xl font-bold p-3 sm:p-4 rounded-xl shadow hover:opacity-90 transition-opacity z-10 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
          }`}
        >
          {loading ? "Sending Invite..." : "Send Invite"}
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;