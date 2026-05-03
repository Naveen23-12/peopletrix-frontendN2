import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  forgotPasswordSchema,
  type ForgetPasswordFormInputs,
} from "../../utils/validations";

import Gradient from "../../components/common/Gradient";
import { HrAPI } from "../../services/apiConfig";
import { getAxiosErrorMessage } from "../../utils/axiosError";

// import passwordImg from "../../assets/images/password.svg";
import { passwordImg } from "../../assets/images";

// interface ForgetPasswordFormInputs {
//   email: string;
// }

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .required("Email is required")
//     .email("Enter a valid email"),
// });

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgetPasswordFormInputs> = async (data) => {
  setIsLoading(true);

  try {
    const email = data.email.toLowerCase().trim();

    const response = await HrAPI.post("/forgot-password", {
      email,
    });

    const result = response.data;

    if (result.success) {
      toast.success("OTP sent to your email ✅");

      navigate("/checkEmail", {
        state: {
          email,
        },
      });
    } else {
      toast.error(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Forgot password error:", error);

    const errorMsg = getAxiosErrorMessage(
      error,
      "Server not reachable. Check backend."
    );

    toast.error(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  const onError = (errors: FieldErrors<ForgetPasswordFormInputs>) => {
    console.log("Validation errors:", errors);
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f8ff] flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="max-lg:hidden lg:flex w-[50%] min-w-[320px] max-w-[520px] h-[650px] bg-[#F4F4FC] rounded-3xl shadow-lg px-10 py-8 flex-col justify-center items-center">
          <img
            src={passwordImg}
            alt="Illustration"
            className="w-[82%] h-[70%] object-contain"
          />
        </div>

        <div className="w-full lg:w-[50%] max-lg:w-[80%] min-w-[320px] max-w-[520px] h-[650px] flex items-center justify-center lg:bg-[#F4F4FC] lg:rounded-3xl lg:shadow-lg lg:px-7 lg:py-9 bg-transparent px-0 py-0">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full max-w-[520px] h-[600px] rounded-3xl p-10 flex flex-col justify-center lg:justify-start relative overflow-hidden bg-[#E9EBF7]"
          >
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="h-7 w-7 border-2 mb-5 border-[#2F3A8F] text-[#2F3A8F] rounded-md flex items-center justify-center hover:cursor-pointer z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2F3A8F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <h1 className="text-2xl font-bold bg-gradient-to-b from-[#5764B3] to-[#252B4D] bg-clip-text text-transparent mb-4 z-10">
              Forgot Password
            </h1>

            <p className="text-[#999999] text-base mb-5 z-10">
              Enter your registered email to receive OTP
            </p>

            <div className="flex flex-col space-y-5 z-10">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email")}
                  disabled={isLoading}
                  className="w-full border-2 border-[#5764B3] rounded-xl p-4 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                />

                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-[250px] lg:w-full mx-auto text-white text-2xl font-bold p-3 rounded-xl shadow hover:opacity-90 flex items-center justify-center transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
                }`}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;