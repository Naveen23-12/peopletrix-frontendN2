import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  checkEmailSchema,
  type CheckEmailFormInputs,
} from "../../utils/validations";

import Gradient from "../../components/common/Gradient";
import { HrAPI } from "../../services/apiConfig";
import { getAxiosErrorMessage } from "../../utils/axiosError";
// import checkmail from "../../assets/images/checkmail.svg";
import { checkmailImg } from "../../assets/images";

// interface CheckEmailFormInputs {
//   code: string;
// }

// const validationSchema = Yup.object().shape({
//   code: Yup.string()
//     .required("OTP is required")
//     .length(6, "Enter 6-digit OTP")
//     .matches(/^\d{6}$/, "Enter only numbers"),
// });

const CheckYourEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckEmailFormInputs>({
    resolver: yupResolver(checkEmailSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const code = otpDigits.join("");
    setValue("code", code, {
      shouldValidate: true,
    });
  }, [otpDigits, setValue]);

  const moveToNextInput = useCallback((index: number) => {
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const moveToPrevInput = useCallback((index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
        e.preventDefault();
        moveToPrevInput(index);
      }
    },
    [otpDigits, moveToPrevInput]
  );

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const numericValue = value.replace(/[^0-9]/g, "");

      if (numericValue.length > 1) return;

      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = numericValue;
      setOtpDigits(newOtpDigits);

      if (numericValue && index < 5) {
        setTimeout(() => moveToNextInput(index), 10);
      }
    },
    [otpDigits, moveToNextInput]
  );

  const clearOtp = () => {
    setOtpDigits(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const onSubmit: SubmitHandler<CheckEmailFormInputs> = async (data) => {
  if (!email) {
    toast.error("No email found. Please start again.");
    navigate("/forget");
    return;
  }

  setIsLoading(true);

  try {
    const response = await HrAPI.post("/verify-forgot-otp", {
      email,
      otp: data.code,
    });

    const result = response.data;

    if (result.success) {
      toast.success("OTP Verified! Set your new password ✅");

      setTimeout(() => {
        navigate("/setPassword", {
          state: {
            email,
            otp: data.code,
          },
        });
      }, 1000);
    } else {
      toast.error(result.message || "Invalid OTP");
      clearOtp();
    }
  } catch (error) {
    console.error("OTP verify error:", error);

    const errorMsg = getAxiosErrorMessage(error, "Invalid OTP");
    toast.error(errorMsg);

    clearOtp();
  } finally {
    setIsLoading(false);
  }
};

  const resendOtp = async () => {
  if (!email) {
    toast.error("No email found. Start from Forgot Password.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await HrAPI.post("/forgot-password", {
      email,
    });

    const result = response.data;

    if (result.success) {
      toast.success("New OTP sent to your email ✅");
      clearOtp();
    } else {
      toast.error(result.message || "Resend failed");
    }
  } catch (error) {
    console.error("Resend OTP error:", error);

    const errorMsg = getAxiosErrorMessage(error, "Network error");
    toast.error(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="w-full min-h-screen bg-[#f7f8ff] flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-10 items-center justify-center">
        

        <div className="w-full md:w-[50%] min-w-[320px] max-w-[520px] min-h-[650px] flex items-center justify-center md:bg-[#F4F4FC] md:rounded-3xl md:shadow-lg md:px-7 md:py-9">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[520px] min-h-[650px] rounded-3xl p-10 flex flex-col justify-start relative overflow-hidden bg-[#E9EBF7]"
          >
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <button
              type="button"
              onClick={() => navigate("/forget")}
              disabled={isLoading}
              className="h-7 w-7 border-2 mb-5 border-[#2F3A8F] text-[#2F3A8F] rounded-md flex items-center justify-center hover:bg-[#E7E9FF] transition-colors z-10"
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
              Check Your Email
            </h1>

            <p className="text-[#999999] mb-8 z-10">
              We sent a 6-digit OTP to{" "}
              <strong>{email || "your email"}</strong>
            </p>

            <div className="flex flex-col space-y-6 z-10">
              <div className="flex gap-3 justify-center w-full max-w-[320px] mx-auto">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isLoading}
                    autoComplete="one-time-code"
                    className={`w-12 h-12 border-2 rounded-2xl text-center text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-md flex-shrink-0 ${
                      digit
                        ? "border-green-500 bg-green-50 text-green-700"
                        : errors.code
                        ? "border-blue-400 bg-red-50 text-blue-400"
                        : "border-[#5764B3] hover:border-blue-400 hover:shadow-lg bg-white"
                    }`}
                  />
                ))}
              </div>

              <input type="hidden" {...register("code")} />

              {/* {errors.code && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200 flex items-center justify-center gap-2">
                  {errors.code.message}

                  <button
                    type="button"
                    onClick={clearOtp}
                    className="underline text-red-700 hover:no-underline text-xs px-2 py-1 bg-white rounded hover:bg-red-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )} */}

              <button
                type="submit"
                disabled={isLoading || !isValid}
                className={`w-full text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center ${
                  isLoading || !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-b from-[#5764B3] to-[#252B4D] hover:from-[#4758a3] hover:to-[#1e2338] hover:shadow-2xl hover:scale-[1.02]"
                }`}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>

              <p className="text-[#999999] text-center text-sm">
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={isLoading}
                  className="text-[#5764B3] underline font-semibold hover:no-underline hover:text-blue-600 transition-colors"
                >
                  Resend Email
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden md:flex w-[50%] min-w-[320px] max-w-[520px] min-h-[730px] bg-[#F4F4FC] rounded-3xl shadow-lg px-10 py-8 flex-col justify-center items-center">
          <img
            src={checkmailImg}
            alt="Check email illustration"
            className="w-[82%]"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckYourEmail;