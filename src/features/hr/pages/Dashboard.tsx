import { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart2,
  Settings,
  CalendarCheck,
  Clock,
  X,
} from "lucide-react";

import { dashboardImg, dashboardiImg } from "../../../assets/images";
import SetEmployeeFields from "../components/SetEmployeeFields";
import SetLeavePolicy from "../components/SetLeavePolicy";
import SetAttendance from "../components/SetAttendance";

type ActivePage = "dashboard" | "employee" | "leave" | "documents" | "reports";

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ height: "100vh" }}
      >
        <div
          className="w-[90vw] h-[85vh] max-w-[1400px] max-h-[95vh] rounded-xl overflow-visible relative animate-in fade-in zoom-in duration-200 bg-transparent"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: 0,
          }}
        >
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

const Dashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#5B6CFF]/20 flex items-center justify-center">
                <img
                  src={dashboardiImg}
                  alt="Dashboard icon"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>

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
                  onClick={() => setShowEmployeeModal(true)}
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
                  onClick={() => setShowLeaveModal(true)}
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
                  onClick={() => setShowAttendanceModal(true)}
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

      default:
        return <div>Coming Soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside className="w-full md:w-64 bg-white p-4 md:p-6 shadow-lg md:sticky md:top-0 md:h-screen">
          <div className="flex justify-center items-center mb-6 md:mb-10">
            <img
              src={dashboardImg}
              alt="Dashboard logo"
              className="w-auto h-14 md:h-20 object-contain"
            />
          </div>

          <nav className="space-y-3 md:space-y-4">
            {[
              { label: "Dashboard", icon: Home, page: "dashboard" },
              { label: "Employee", icon: Users, page: "employee" },
              { label: "Leave", icon: Calendar, page: "leave" },
              { label: "Documents", icon: FileText, page: "documents" },
              { label: "Reports", icon: BarChart2, page: "reports" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 text-gray-600 hover:text-[#5B6CFF] cursor-pointer transition text-sm md:text-base p-2 rounded-lg ${
                  activePage === item.page
                    ? "bg-[#5B6CFF]/10 text-[#5B6CFF] font-medium"
                    : ""
                }`}
                onClick={() => setActivePage(item.page as ActivePage)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8 bg-white">
          <div className="bg-[#EDF0FB] rounded-2xl p-4 md:p-8 shadow-sm">
            {renderPageContent()}
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