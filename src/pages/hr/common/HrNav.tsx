import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart2,
} from "lucide-react";

import { dashboardImg } from "../../../assets/images";

export type HrPage =
  | "dashboard"
  | "employee"
  | "leave"
  | "documents"
  | "reports";

type HrNavProps = {
  activePage: HrPage;
  onPageChange: (page: HrPage) => void;
};

const HrNav = ({ activePage, onPageChange }: HrNavProps) => {
  const menuItems = [
    { label: "Dashboard", icon: Home, page: "dashboard" },
    { label: "Employee", icon: Users, page: "employee" },
    { label: "Leave", icon: Calendar, page: "leave" },
    { label: "Documents", icon: FileText, page: "documents" },
    { label: "Reports", icon: BarChart2, page: "reports" },
  ] as const;

  return (
    <aside className="w-full md:w-64 bg-white p-4 md:p-6 shadow-lg md:sticky md:top-0 md:h-screen">
      <div className="flex justify-center items-center mb-6 md:mb-10">
        <img
          src={dashboardImg}
          alt="Dashboard logo"
          className="w-auto h-14 md:h-20 object-contain"
        />
      </div>

      <nav className="space-y-3 md:space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onPageChange(item.page)}
            className={`flex items-center gap-3 text-gray-600 hover:text-[#5B6CFF] cursor-pointer transition text-sm md:text-base p-2 rounded-lg ${
              activePage === item.page
                ? "bg-[#5B6CFF]/10 text-[#5B6CFF] font-medium"
                : ""
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default HrNav;