import { useState } from "react";
import {
  Settings,
  CalendarCheck,
  Clock,
  X,
} from "lucide-react";

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

const DashboardHome = ({
  openEmployee,
  openLeave,
  openAttendance,
}: {
  openEmployee: () => void;
  openLeave: () => void;
  openAttendance: () => void;
}) => {
  return (
    <>
      <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center mb-6 md:mb-8">
        {/* <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#5B6CFF]/20 flex items-center justify-center"> */}
          <img 
            src={dashboardiImg}
            alt="Dashboard icon"
            className="w-8 h-8  relative top-[0px] md:w-50 md:h-50"
          />
        {/* </div> */}

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#5863B2]">
            Welcome, Deena
          </h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Have a nice day at work
          </p>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div
            className="bg-white rounded-xl p-4 md:p-5 flex gap-3 md:gap-4 hover:shadow-md transition cursor-pointer group"
            onClick={openEmployee}
          >
            <Settings className="text-[#5B6CFF] flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-sm md:text-base">
                Set Employee fields
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Manage employee fields, roles, and information
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 md:p-5 flex gap-3 md:gap-4 hover:shadow-md transition cursor-pointer group"
            onClick={openLeave}
          >
            <CalendarCheck className="text-[#5B6CFF] flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-sm md:text-base">
                Set Leave Policy & Holiday
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Define leave rules, holiday calendars and approvals
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 md:p-5 flex gap-3 md:gap-4 hover:shadow-md transition cursor-pointer group"
            onClick={openAttendance}
          >
            <Clock className="text-[#5B6CFF] flex-shrink-0 w-6 h-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-sm md:text-base">
                Set Attendance
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Configure shifts, work hours, and attendance rules
              </p>
            </div>
          </div>
        </div>
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
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <HrNav activePage={activePage} onPageChange={setActivePage} />

        <main className="flex-1 p-4 md:p-8 bg-white">
          <div className="bg-[#EDF0FB] rounded-2xl p-4 md:p-8 shadow-sm min-h-full">
            {renderPage()}
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