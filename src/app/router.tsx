import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Login,
  Signup,
  ForgetPassword,
  CheckYourEmail,
  VerifyOtp,
  SetPassword,
  PasswordReset,
  Success,
} from "../pages";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/checkEmail" element={<CheckYourEmail />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/setPassword" element={<SetPassword />} />
        <Route path="/passwordReset" element={<PasswordReset />} />

        
        <Route path="/success" element={<Success />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;