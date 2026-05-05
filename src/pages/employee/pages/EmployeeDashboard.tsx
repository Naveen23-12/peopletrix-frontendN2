import { useState } from "react";

import {
  Bell,
  ChevronDown,
  Search,
  UserCheck,
  BadgeIndianRupee,
  FileCog,
  FileText,
} from "lucide-react";

import {
  MyAttendance,
  Payroll,
  ManageLeave,
  PolicyDocument,
} from "./dashboardFeatures";

import { peopleTrixLogo } from "../../../assets/images";

const notifications = [
  {
    id: 1,
    color: "bg-[#684DF4]",
    bg: "bg-[#F4F1FF]",
    text: "New policy changes implemented on 27 Aug, 2025.",
    time: "2m ago",
  },
  {
    id: 2,
    color: "bg-[#16B45F]",
    bg: "bg-[#F2FFF7]",
    text: "Salary notification has been sent out and pay slip for Feb, 2026 is uploaded.",
    time: "1h ago",
  },
  {
    id: 3,
    color: "bg-[#FF9914]",
    bg: "bg-[#FFF9F0]",
    text: "Emergency: Due to XYZ reason, company will not operate on <Date>.",
    time: "3h ago",
  },
];

const features = [
  {
    id: "attendance",
    title: "My Attendance",
    icon: <UserCheck size={34} className="text-[#FF8A00]" />,
    bg: "bg-[#FFF3E2]",
  },
  {
    id: "payroll",
    title: "Payroll",
    icon: <BadgeIndianRupee size={34} className="text-[#F64086]" />,
    bg: "bg-[#FFEAF3]",
  },
  {
    id: "leave",
    title: "Manage Leave",
    icon: <FileCog size={34} className="text-[#2F7DFF]" />,
    bg: "bg-[#EAF3FF]",
  },
  {
    id: "policy",
    title: "Policy Document",
    icon: <FileText size={34} className="text-[#6548F4]" />,
    bg: "bg-[#F0EDFF]",
  },
] as const;

type FeatureType = "attendance" | "payroll" | "leave" | "policy";

const getFirstName = () => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    return (
      userData?.firstName ||
      userData?.preferredName ||
      userData?.name?.split(" ")?.[0] ||
      "Abhi"
    );
  } catch {
    return "Abhi";
  }
};

const EmployeeDashboard = () => {
  const firstName = getFirstName();

  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(
    null,
  );

  const renderSelectedFeature = () => {
    switch (selectedFeature) {
      case "attendance":
        return <MyAttendance onClose={() => setSelectedFeature(null)} />;

      case "payroll":
        return <Payroll onClose={() => setSelectedFeature(null)} />;

      case "leave":
        return <ManageLeave onClose={() => setSelectedFeature(null)} />;

      case "policy":
        return <PolicyDocument onClose={() => setSelectedFeature(null)} />;

      default:
        return null;
    }
  };

  return (
    <main className="flex-1 min-w-0 p-8 bg-white overflow-x-hidden h-screen">
      <div className="bg-[#EDF0FB] rounded-2xl p-4 shadow-sm min-h-[560px] overflow-hidden min-h-full max-w-[1900px]">
        <div className="w-full min-h-[560px] p-10 max-[480px]:p-0">
          {/* Top Header */}
          <div className="flex items-center justify-between gap-4 mb-9 sm:mb-10">
            {/* Logo */}
            <img
              src={peopleTrixLogo}
              alt="PeopleTrix"
              className="h-[26px] sm:h-[32px] w-auto object-contain shrink-0"
            />

            {/* Search Bar */}
            <div className="hidden sm:flex w-full max-w-[800px] h-[45px] bg-[#F8F8FF] rounded-[8px] shadow-[0px_2px_8px_rgba(88,99,178,0.25)] items-center px-4">
              <Search size={20} className="text-[#5863B2] mr-4 shrink-0" />

              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none text-[#5863B2] placeholder:text-[#5863B2] text-[13px]"
              />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 shrink-0">
              <button className="w-[40px] h-[40px] rounded-[10px] border border-[#5863B2] flex items-center justify-center text-[#5863B2]">
                <Bell size={22} fill="#5863B2" />
              </button>

              <button className="w-[40px] h-[40px] rounded-[10px] border border-[#5863B2] flex items-center justify-center text-[#5863B2]">
                <ChevronDown size={22} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden w-full h-[38px] bg-[#F8F8FF] rounded-[8px] shadow-[0px_2px_8px_rgba(88,99,178,0.25)] flex items-center px-4 mb-10">
            <Search size={20} className="text-[#5863B2] mr-4 shrink-0" />

            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none text-[#5863B2] placeholder:text-[#5863B2] text-[13px]"
            />
          </div>

          {/* Welcome */}
          <div className="mb-10 sm:mb-12">
            <h1 className="text-[#5863B2] text-[28px] sm:text-[32px] font-semibold">
              Welcome back, {firstName}
            </h1>

            <p className="text-[#888888] text-[17px] sm:text-[20px] font-semibold mt-2">
              Here’s what’s happening in your organization today.
            </p>
          </div>

          {/* Pending Approval */}
          <div className="max-w-[270px] h-[82px] bg-[#EAF3FF] rounded-[8px] shadow-[0px_4px_15px_rgba(0,0,0,0.18)] px-7 py-4 mb-12 sm:mb-[50px]">
            <div className="flex items-center gap-3">
              <span className="text-black text-[24px] font-bold">07</span>
              <span className="text-[#6E7A8A] text-[20px] font-semibold">
                Pending Approvals
              </span>
            </div>

            <p className="text-[#0EB25F] text-[13px] font-semibold mt-1">
              3% <span className="text-[#8A8A8A]">vs Yesterday</span>
            </p>
          </div>

          {/* Main Cards */}
          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-8
              xl:gap-[50px]
              w-full
            "
          >
            {/* Toast Notification */}
            <div className="bg-white rounded-[25px] shadow-[0px_4px_18px_rgba(0,0,0,0.18)] px-5 sm:px-8 py-7 min-h-[350px] max-w-[700px]">
              <h2 className="text-[#3026A8] text-[22px] font-bold mb-8">
                Toast Notification
              </h2>

              <div className="relative flex">
                {/* Timeline */}
                <div className="relative w-[28px] shrink-0 pt-5">
                  <div className="absolute left-[6px] top-0 bottom-0 w-[1px] bg-[#E2E2E2]" />

                  {notifications.map((item, index) => (
                    <span
                      key={item.id}
                      className={`absolute left-[2px] w-[9px] h-[9px] rounded-full ${item.color}`}
                      style={{ top: `${index * 78 + 22}px` }}
                    />
                  ))}
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-6 pr-4 min-w-0">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`min-h-[58px] rounded-[9px] ${item.bg} px-4 py-3 flex items-center justify-between gap-4`}
                    >
                      <p className="text-black text-[15px] leading-[20px]">
                        {item.text}
                      </p>

                      <span className="text-[#8A8A8A] text-[15px] whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fake scrollbar */}
                <div className="w-[8px] rounded-full bg-[#CCD0EF] shrink-0">
                  <div className="w-[8px] h-[50px] rounded-full bg-[#5863B2]" />
                </div>
              </div>
            </div>

            {/* Features */}
            {selectedFeature ? (
              <div className="w-full flex items-start justify-start">
                {renderSelectedFeature()}
              </div>
            ) : (
              <div className="bg-white rounded-[25px] shadow-[0px_4px_18px_rgba(0,0,0,0.18)] px-6 sm:px-8 py-6 min-h-[350px] max-w-[700px]">
                <h2 className="text-[#3026A8] text-[22px] font-bold mb-8">
                  Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 gap-x-10">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => setSelectedFeature(feature.id)}
                      className="flex items-center gap-5 text-left group"
                    >
                      <div
                        className={`w-[80px] h-[80px] rounded-[8px] ${feature.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition`}
                      >
                        {feature.icon}
                      </div>

                      <p className="text-black text-[16px] leading-[21px] max-w-[110px]">
                        {feature.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployeeDashboard;
