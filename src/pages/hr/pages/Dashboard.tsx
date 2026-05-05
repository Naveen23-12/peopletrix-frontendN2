import { useState } from "react";
import { User, FileCheck2, Clock, X } from "lucide-react";

import { dashboardiImg } from "../../../assets/images";
import { HrNav } from "../common";
import type { HrPage } from "../common";

import Employee from "./Employee";
import Leave from "./Leave";
import Documents from "./Documents";
import Reports from "./Reports";

import {
  SetEmployeeFields,
  SetLeavePolicy,
  SetAttendance,
} from "./dashboardSettings";

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-[90vw] h-[85vh] max-w-[1400px] max-h-[95vh] rounded-xl overflow-visible relative bg-transparent">
          <button
            className="absolute z-20 -top-10 -right-4 bg-white/90 p-3 rounded-full shadow-2xl transition-all border border-gray-200 hover:scale-105 backdrop-blur-sm"
            onClick={onClose}
          >
            <X size={24} className="text-[#5863B2]" />
          </button>

          {children}
        </div>
      </div>
    </>
  );
};

const DashboardCard = ({ title, description, icon, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        w-[280px] h-[160px]
        rounded-[22px]
        border-2 border-[#D4D6E2]
        bg-[#F8F8FF]
        px-4 py-7
        cursor-pointer
        transition
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-3 mb-7">
        <div className="w-[31px] h-[31px] rounded-[5px] bg-[#5863B2] flex items-center justify-center text-white">
          {icon}
        </div>

        <h3 className="text-[15px] font-medium text-[#5863B2]">
          {title}
        </h3>
      </div>

      <p className="text-[15px] leading-[22px] text-[#5863B2]">
        {description}
      </p>
    </div>
  );
};

const DashboardHome = ({
  openEmployee,
  openLeave,
  openAttendance,
}: {
  openEmployee: () => void;
  openLeave: () => void;
  openAttendance: () => void;
}) => {
   const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const firstName =
    userData?.firstName ||
    userData?.name ||
    userData?.fullName?.split(" ")?.[0] ||
    "User";
  return (
    <>
      {/* Welcome section - keeping your existing image */}
      <div className="relative bg-[#E8EAF6] rounded-2xl flex flex-row items-center w-120 mb-6 md:mb-8 overflow-visible pl-28 md:pl-36 pr-6 py-5 max-md:w-auto max-[450px]:pl-20 max-[450px]:pr-3">
  <img
    src={dashboardiImg}
    alt="Dashboard icon"
    className="absolute -left-4 bottom-0 w-28 md:w-36 object-contain "
  />

  <div className="flex flex-col justify-center pl-10 py-2">
    <h2 className="text-xl md:text-3xl font-bold text-[#5863B2]">
      Welcome, {firstName}
    </h2>
    <p className="text-[#5863B2]/80 text-xs md:text-lg mt-0.5">
      Have a nice day at work
    </p>
  </div>
</div> 

      {/* Cards section */}
      <div className="w-full bg-[#E6E8F5] rounded-[12px] p-8 h-fit">
        <div className="flex flex-wrap justify-around gap-5">
          <DashboardCard
            title="Set Employee fields"
            description="Manage employee fields, roles, and information ect..."
            icon={<User size={20} fill="white" strokeWidth={2.5} />}
            onClick={openEmployee}
          />

          <DashboardCard
            title="Set Leave Policy & Holiday"
            description="Define leave rules, holiday calendars, and approvals."
            icon={<FileCheck2 size={20} strokeWidth={2.5} />}
            onClick={openLeave}
          />

          <DashboardCard
            title="Set Attendance"
            description="Configure shifts, work hours, and attendance rules."
            icon={<Clock size={20} strokeWidth={2.5} />}
            onClick={openAttendance}
          />
        </div>

        {/* <div className="h-[145px]" /> */}
      </div>
    </>
  );
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState<HrPage>("dashboard");

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardHome
            openEmployee={() => setShowEmployeeModal(true)}
            openLeave={() => setShowLeaveModal(true)}
            openAttendance={() => setShowAttendanceModal(true)}
          />
        );

      case "employee":
        return <Employee />;

      case "leave":
        return <Leave />;

      case "documents":
        return <Documents />;

      case "reports":
        return <Reports />;

      default:
        return null;
    }
  };

  return (
  <div className="min-h-screen bg-[#F4F6FB] overflow-x-hidden">
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      <HrNav activePage={activePage} onPageChange={setActivePage} />

      <main className="flex-1 min-w-0 p-8 bg-white overflow-x-hidden">
        <div className="bg-[#EDF0FB] rounded-2xl p-4 shadow-sm min-h-[560px] overflow-hidden min-h-full max-w-[1600px]">
          <div className="w-full min-h-[560px] p-10 max-[480px]:p-0">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>

    {showEmployeeModal && (
      <ModalWrapper onClose={() => setShowEmployeeModal(false)}>
        <SetEmployeeFields onClose={() => setShowEmployeeModal(false)} />
      </ModalWrapper>
    )}

    {showLeaveModal && (
      <ModalWrapper onClose={() => setShowLeaveModal(false)}>
        <SetLeavePolicy onClose={() => setShowLeaveModal(false)} />
      </ModalWrapper>
    )}

    {showAttendanceModal && (
      <ModalWrapper onClose={() => setShowAttendanceModal(false)}>
        <SetAttendance onClose={() => setShowAttendanceModal(false)} />
      </ModalWrapper>
    )}
  </div>
);
};

export default Dashboard;