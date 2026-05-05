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
      placeholder: "Your Email",
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
  <div className="w-full min-h-screen sm:min-h-0 flex items-center justify-center bg-transparent p-3 sm:p-4">
    <div
      className="
        w-full
        max-w-[800px]
        
        sm:h-[88vh]
        max-h-[900px]
        rounded-[18px]
        sm:rounded-[22px]
        mx-auto
        relative
        flex flex-col
        overflow-hidden
        bg-[#E9EBF7]
        px-4
        min-[480px]:px-6
        sm:px-10
        md:px-16
        py-7
        sm:py-10
      "
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4 z-20
          w-8 h-8
          flex items-center justify-center
          rounded-md
          bg-[#5764B3]
          hover:bg-[#4a56a0]
          cursor-pointer
          transition-all duration-200
          hover:scale-110
        "
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

      <h1
        className="
          text-center
          text-[26px]
          min-[480px]:text-[30px]
          sm:text-[38px]
          font-semibold
          text-[#5863B2]
          mb-6
          sm:mb-10
          shrink-0
          z-10
          pr-10
          sm:pr-0
        "
      >
        Add Employee
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4 w-full max-w-[480px] mx-auto text-sm z-10">
          {error}
        </div>
      )}

      <form
        id="add-employee-form"
        onSubmit={handleSubmit(onSubmit, onError)}
        className="
          z-10
          flex-1
          overflow-y-auto
          overflow-x-hidden
          pr-1
          sm:pr-2
          add-employee-scroll
        "
      >
        <div
          className="
            w-full
            max-w-[480px]
            mx-auto
            flex flex-col
            gap-4
            min-[480px]:gap-5
            sm:gap-7
            pb-6
          "
        >
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <input
                type={field.type}
                {...register(field.name)}
                placeholder={field.placeholder}
                disabled={loading}
                className="
                  w-full
                  h-[54px]
                  min-[480px]:h-[62px]
                  sm:h-[65px]
                  border-2
                  border-[#5863B2]
                  rounded-[11px]
                  sm:rounded-[13px]
                  px-4
                  min-[480px]:px-6
                  sm:px-9
                  outline-none
                  bg-transparent
                  text-[#5863B2]
                  placeholder:text-[#5863B2]
                  text-[15px]
                  min-[480px]:text-[17px]
                  sm:text-[20px]
                  disabled:bg-gray-100
                  disabled:cursor-not-allowed
                "
              />

              {errors[field.name] && (
                <p className="text-red-500 text-xs sm:text-sm mt-2 ml-1 sm:ml-2">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full h-[50px] min-[480px]:h-[56px] sm:h-[62px] mx-auto text-white text-lg sm:text-2xl font-bold rounded-xl shadow hover:opacity-90 transition-opacity ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
            }`}
          >
            {loading ? "Sending Invite..." : "Send Invite"}
          </button>
        </div>
      </form>

      <style>{`
        .add-employee-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .add-employee-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .add-employee-scroll::-webkit-scrollbar-thumb {
          background: #5863B2;
          border-radius: 12px;
        }

        .add-employee-scroll {
          scrollbar-width: thin;
          scrollbar-color: #5863B2 transparent;
        }

        @media (max-width: 480px) {
          .add-employee-scroll::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </div>
  </div>
);
};

export default AddEmployee;