import React from "react";
import { useNavigate } from "react-router-dom";

import Gradient from "../../components/common/Gradient";
// import success from "../../assets/images/success.svg";
import { successImg } from "../../assets/images";

const Success: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f8ff] flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-10 items-center justify-center">
       

        <div className="w-full lg:w-[50%] max-lg:w-[80%] min-w-[320px] max-w-[520px] h-[650px] flex items-center justify-center lg:bg-[#F4F4FC] lg:rounded-3xl lg:shadow-lg lg:px-7 lg:py-9 bg-transparent px-0 py-0">
          <div className="w-full max-w-[520px] h-[600px] rounded-3xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden bg-[#E9EBF7]">
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none">
              <Gradient />
            </div>

            <div className="h-[50px] w-[50px] border-2 rounded-full border-[#2F3A8F] flex items-center justify-center mb-5 z-10">
              <span className="text-[#2F3A8F] text-2xl font-bold">✔</span>
            </div>

            <h1 className="text-2xl font-bold bg-gradient-to-b from-[#5764B3] to-[#252B4D] bg-clip-text text-transparent mb-8 z-10">
              Successful
            </h1>

            <p className="text-[#999999] mb-5 z-10">
              Congratulations! Your password has been changed. Click continue to
              login.
            </p>

            <div className="flex flex-col space-y-5 mt-4 z-10">
              <button
                type="button"
                onClick={handleContinue}
                className="w-[300px] mx-auto bg-gradient-to-b from-[#5764B3] to-[#252B4D] text-white text-2xl font-bold p-3 rounded-xl shadow hover:opacity-90"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
         <div className="max-lg:hidden lg:flex w-[50%] min-w-[320px] max-w-[520px] h-[650px] bg-[#F4F4FC] rounded-3xl shadow-lg px-10 py-8 flex-col justify-center items-center">
          <img
            src={successImg}
            alt="Illustration"
            className="w-[82%] h-[70%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Success;