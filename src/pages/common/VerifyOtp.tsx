import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Gradient from "../../components/common/Gradient";
import { HrAPI } from "../../services/apiConfig";
import { getAxiosErrorMessage } from "../../utils/axiosError";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!otp) {
    toast.error("Please enter OTP");
    return;
  }

  if (!email) {
    toast.error("Email missing. Please signup again.");
    navigate("/signup");
    return;
  }

  setIsLoading(true);

  try {
    const response = await HrAPI.post("/verify-otp", {
      email: email.trim().toLowerCase(),
      otp: otp.trim(),
    });

    const result = response.data;

    toast.success(result.message || "Email verified successfully ✅");
    setIsVerified(true);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (error) {
    console.error("OTP verify error:", error);

    const errorMsg = getAxiosErrorMessage(error, "Invalid OTP");
    toast.error(errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="w-full min-h-screen bg-[#f7f8ff] flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-[520px] h-[500px] flex items-center justify-center">
        <form
          onSubmit={handleVerify}
          className="w-full h-full rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden bg-[#E9EBF7]"
        >
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none">
            <Gradient />
          </div>

          <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none">
            <Gradient />
          </div>

          <h1 className="text-center text-2xl font-bold bg-gradient-to-b from-[#5764B3] to-[#252B4D] bg-clip-text text-transparent mb-6 z-10">
            Verify OTP
          </h1>

          <p className="text-center text-[#5764B3] mb-6 text-sm z-10">
            Enter the OTP sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>

          <div className="flex flex-col space-y-5 z-10">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              disabled={isLoading}
              className="w-full border-2 border-[#5764B3] rounded-xl p-4 outline-none bg-white placeholder:text-[#5764B3] text-[#5764B3] text-base text-center tracking-widest disabled:bg-gray-100"
            />

            <button
              type="submit"
              disabled={isLoading || isVerified}
              className={`mt-4 w-[70%] mx-auto text-white text-2xl font-bold p-3 rounded-xl shadow hover:opacity-90 transition-all duration-200 flex items-center justify-center ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : isVerified
                  ? "bg-green-500"
                  : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
              }`}
            >
              {isLoading ? "Verifying..." : isVerified ? "✅ Verified!" : "Verify"}
            </button>

            <div className="flex justify-center text-sm mt-4 text-[#5764B3]">
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Go back to Signup
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;