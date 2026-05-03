import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { signupSchema, type SignupFormInputs } from "../../utils/validations";

import Gradient from "../../components/common/Gradient";
import { HrAPI } from "../../services/apiConfig";
import { getAxiosErrorMessage } from "../../utils/axiosError";

import { loginSliderImages } from "../../assets/images";

// import loginImg from "../../assets/images/login.svg";
// import login2 from "../../assets/images/login2.svg";
// import login3 from "../../assets/images/login3.svg";
// import login4 from "../../assets/images/login4.svg";

// interface SignupFormInputs {
//   firstName: string;
//   lastName: string;
//   loginUrl: string;
//   loginId: string;
//   password: string;
//   organizationName: string;
//   organizationDomain: string;
//   orgCode?: string;
// }

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .required("First Name is required")
//     .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
//     .min(2, "Must be at least 2 characters"),
//   lastName: Yup.string()
//     .required("Last Name is required")
//     .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
//     .min(2, "Must be at least 2 characters"),
//   loginUrl: Yup.string()
//     .required("Email is required")
//     .email("Enter a valid email"),
//   loginId: Yup.string()
//     .required("Login ID is required")
//     .min(3, "Must be at least 3 characters"),
//   password: Yup.string()
//     .required("Password is required")
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
//       "Min 6 chars, includes letters & numbers"
//     ),
//   organizationName: Yup.string()
//     .required("Organization Name is required")
//     .min(2, "Must be at least 2 characters"),
//   organizationDomain: Yup.string()
//     .required("Organization Domain is required")
//     .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid domain"),
//   orgCode: Yup.string().optional(),
// });

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const images = loginSliderImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      loginUrl: "",
      loginId: "",
      password: "",
      organizationName: "",
      organizationDomain: "",
      orgCode: "",
    },
  });

const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
  setIsLoading(true);
  setSignupSuccess(false);

  try {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.loginUrl.trim().toLowerCase(),
      phone: data.loginId,
      password: data.password,
      organizationName: data.organizationName,
      organizationDomain: data.organizationDomain,
      orgCode: data.orgCode || "ORG" + Date.now(),
    };

    const response = await HrAPI.post("/signup", payload);

    const result = response.data;

    toast.success(result.message || "OTP sent to your email ✅");
    setSignupSuccess(true);
    reset();

    setTimeout(() => {
      navigate("/verify-otp", {
        state: {
          email: payload.email,
        },
      });
    }, 1500);
  } catch (error) {
    console.error("Signup error:", error);

    const errorMsg = getAxiosErrorMessage(
      error,
      "Server not reachable. Check backend."
    );

    toast.error(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  const onError = (errors: FieldErrors<SignupFormInputs>) => {
    console.log("Validation errors:", errors);
    toast.error("Please fix form errors");
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f8ff] flex items-center justify-center p-4 md:p-10 max-[800px]:p-0">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-10 items-center justify-center">

      <div className="w-full lg:w-[50%] max-lg:w-[80%] min-w-[320px] max-w-[520px] h-[750px] flex items-center justify-center lg:bg-[#F4F4FC] lg:rounded-3xl lg:shadow-lg lg:px-7 lg:py-9 bg-transparent px-0 py-0">
          <div className="w-full max-w-[520px] h-[700px] rounded-3xl p-10 flex flex-col relative overflow-hidden bg-[#E9EBF7]">
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <h1 className="text-center text-2xl font-bold bg-gradient-to-b from-[#5764B3] to-[#252B4D] bg-clip-text text-transparent mb-8 z-10 shrink-0">
              Sign Up
            </h1>

            <div
              className="flex-1 overflow-y-auto z-10 signup-scroll"
              style={{
                paddingRight: "10px",
                scrollbarWidth: "thin",
                scrollbarColor: "#5764B3 transparent",
              }}
            >
              <div className="flex flex-col space-y-5 mt-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("firstName")}
                    placeholder="First Name"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="email"
                    {...register("loginUrl")}
                    placeholder="Email"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.loginUrl && (
                    <span className="text-red-500 text-sm">
                      {errors.loginUrl.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("loginId")}
                    placeholder="Login ID"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.loginId && (
                    <span className="text-red-500 text-sm">
                      {errors.loginId.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("organizationName")}
                    placeholder="Organization Name"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.organizationName && (
                    <span className="text-red-500 text-sm">
                      {errors.organizationName.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("organizationDomain")}
                    placeholder="Organization Domain (e.g. company.com)"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 max-[500px]:p-2 max-[500px]:text-[14px]"
                  />

                  {errors.organizationDomain && (
                    <span className="text-red-500 text-sm">
                      {errors.organizationDomain.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("orgCode")}
                    placeholder="Organization Code (optional)"
                    disabled={isLoading}
                    className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-transparent placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 max-[500px]:p-2 max-[500px]:text-[14px]"
                  />
                </div>

                <div className="flex justify-end text-base mt-2 text-[#5764B3] max-[500px]:justify-center">
                  <div
                    className="cursor-pointer hover:underline "
                    onClick={() => navigate("/login")}
                  >
                    Already have an account?{" "}
                    <span className="font-semibold">Login</span>
                  </div>
                </div>

                <div className="h-4"></div>
              </div>
            </div>

            <div className="shrink-0 flex justify-center mt-4 z-10">
              <button
                type="button"
                onClick={handleSubmit(onSubmit, onError)}
                disabled={isLoading || signupSuccess}
                className={`w-[70%] text-white text-2xl font-bold p-3 rounded-xl shadow hover:opacity-90 transition-all duration-200 flex items-center justify-center max-[500px]:p-1 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : signupSuccess
                    ? "bg-green-500"
                    : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
                }`}
              >
                {isLoading
                  ? "Creating..."
                  : signupSuccess
                  ? "✅ Created!"
                  : "Sign Up"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-lg:hidden lg:flex w-[50%] min-w-[320px] max-w-[520px] h-[750px] bg-[#F4F4FC] rounded-3xl shadow-lg px-10 py-8 flex-col justify-between">
          <div className="text-center flex-1 flex items-center justify-center">
            <div>
              <h1 className="text-2xl font-bold leading-snug bg-gradient-to-b from-[#5764B3] to-[#252B4D] bg-clip-text text-transparent">
                Boost Engagement. Inspire Success
              </h1>
              <p className="text-[#5764B3] max-w-sm mx-auto mt-6 text-base leading-6">
                Stop managing tasks and start empowering your people. Give
                employees the tools they need to grow, learn, and succeed, all
                in one platform.
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center flex-1">
            <img
              src={images[currentImageIndex]}
              alt="Illustration"
              className="w-[90%] h-full max-h-[400px] object-contain transition-all duration-500"
            />
          </div>
        </div>

        
      </div>

      <style>{`
        .signup-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .signup-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .signup-scroll::-webkit-scrollbar-thumb {
          background: #5764B3;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default Signup;