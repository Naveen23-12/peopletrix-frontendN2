import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { loginSchema, type LoginFormInputs } from "../../utils/validations";

import Gradient from "../../components/common/Gradient";
import { HrAPI, EmployeeAPI } from "../../services/apiConfig";
import { getAxiosErrorMessage } from "../../utils/axiosError";

import { loginSliderImages } from "../../assets/images";

// import loginImg from "../../assets/images/login.svg";
// import login2 from "../../assets/images/login2.svg";
// import login3 from "../../assets/images/login3.svg";
// import login4 from "../../assets/images/login4.svg";

// interface LoginFormInputs {
//   role: string;
//   name: string;
//   password: string;
// }

// const validationSchema = Yup.object().shape({
//   role: Yup.string()
//     .required("Please select a role")
//     .notOneOf([""], "Please select a valid role")
//     .oneOf(["Admin", "Employee"], "Please select Admin or Employee"),
//   name: Yup.string()
//     .required("Login ID is required")
//     .min(3, "Must be at least 3 characters"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Min 6 characters"),
// });

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");

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
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      role: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
  setIsLoading(true);
  setLoginSuccess(false);
  setError("");

  try {
    const loginData = {
      email: data.name.toLowerCase().trim(),
      password: data.password,
    };

    const api = data.role === "Admin" ? HrAPI : EmployeeAPI;

    const response = await api.post("/login", loginData);

    const result = response.data;

    if (result.success) {
      toast.success(`${data.role} login successful!`);
      setLoginSuccess(true);

      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", data.role.toLowerCase());
      localStorage.setItem("userData", JSON.stringify(result.data));

      reset();

      const redirectPath =
        data.role === "Admin" ? "/dashboard" : "/employee-dashboard";

      setTimeout(() => {
        navigate(redirectPath);
      }, 1200);
    } else {
      const errorMsg = result.message || result.error || "Invalid credentials";
      toast.error(errorMsg);
      setError(errorMsg);
    }
  } catch (error) {
    console.error("Login error:", error);

    const errorMsg = getAxiosErrorMessage(
      error,
      "Server not reachable. Check backend or CORS."
    );

    toast.error(errorMsg);
    setError(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  const onError = (errors: FieldErrors<LoginFormInputs>) => {
    console.log("Validation errors:", errors);
    toast.error("Please fix form errors");
  };

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235764B3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9' /%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1.25rem center",
    backgroundSize: "1rem",
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f8ff] flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="max-lg:hidden lg:flex w-[50%] min-w-[320px] max-w-[520px] h-[650px] bg-[#F4F4FC] rounded-3xl shadow-lg px-10 py-8 flex-col justify-between">
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

            <h1 className="text-center text-2xl font-bold bg-gradient-to-b from-[#5764B3] to-[#252B4D] bg-clip-text text-transparent mb-8 z-10">
              Login
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 z-10">
                {error}
              </div>
            )}

            <div className="flex flex-col space-y-5 mt-4 z-10">
              <div className="flex flex-col">
                <select
                  {...register("role")}
                  disabled={isLoading}
                  className="w-full border-2 border-[#5764B3] rounded-xl p-4 pr-12 outline-none bg-white text-[#5764B3] appearance-none text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={selectStyle}
                >
                  <option value="" disabled>
                    Login as
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>

                {errors.role && (
                  <span className="text-red-500 text-sm">
                    {errors.role.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter Email"
                  disabled={isLoading}
                  className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-white placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                />

                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  disabled={isLoading}
                  className="w-full border-2 border-[#5764B3] rounded-xl p-4 mt-2 outline-none bg-white placeholder:text-[#5764B3] text-[#5764B3] text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                />

                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || loginSuccess}
                className={`mt-4 w-[70%] mx-auto text-white text-2xl font-bold p-3 rounded-xl shadow hover:opacity-90 transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed ${
                  isLoading
                    ? "bg-gray-400"
                    : loginSuccess
                    ? "bg-green-500"
                    : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
                }`}
              >
                {isLoading
                  ? "Logging in..."
                  : loginSuccess
                  ? "✅ Success!"
                  : "Login"}
              </button>

              <div className="flex justify-between text-base mt-6 text-[#5764B3]">
                <div
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </div>

                <div
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/forget")}
                >
                  Forgot Password?
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;