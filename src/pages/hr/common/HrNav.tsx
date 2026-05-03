import { useState } from "react";

import {
  dashboardImg,
  homeIcon,
  navEmployeeIcon,
  navLeaveIcon,
  navDocumentsIcon,
  navReportsIcon,
} from "../../../assets/images";

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
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      image: homeIcon,
      page: "dashboard",
    },
    {
      label: "Employee",
      image: navEmployeeIcon,
      page: "employee",
    },
    {
      label: "Leave",
      image: navLeaveIcon,
      page: "leave",
    },
    {
      label: "Documents",
      image: navDocumentsIcon,
      page: "documents",
    },
    {
      label: "Reports",
      image: navReportsIcon,
      page: "reports",
    },
  ] as const;

  const handlePageChange = (page: HrPage) => {
    onPageChange(page);
    setIsOpen(false);
  };

  const MenuList = () => {
    return (
      <nav className="space-y-3 md:space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => handlePageChange(item.page)}
            className={`flex items-center gap-4 cursor-pointer transition text-sm md:text-base p-3 rounded-lg ${
              activePage === item.page
                ? "bg-[#EEF0FF] text-[#5863B2] font-semibold"
                : "text-[#202945] hover:bg-[#EEF0FF] hover:text-[#5863B2]"
            }`}
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-5 h-5 object-contain"
            />

            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    );
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden w-full bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <img
          src={dashboardImg}
          alt="PeopleTrix"
          className="h-10 object-contain"
        />

        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-lg bg-[#EEF0FF] flex items-center justify-center"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1">
            <span className="w-5 h-[2px] bg-[#5863B2] rounded-full"></span>
            <span className="w-5 h-[2px] bg-[#5863B2] rounded-full"></span>
            <span className="w-5 h-[2px] bg-[#5863B2] rounded-full"></span>
          </span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-white z-50 md:hidden shadow-xl p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <img
            src={dashboardImg}
            alt="PeopleTrix"
            className="h-12 object-contain"
          />

          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-lg bg-[#EEF0FF] text-[#5863B2] flex items-center justify-center text-2xl leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <MenuList />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white p-4 md:p-6 shadow-lg md:sticky md:top-0 md:h-screen">
        <div className="flex justify-center items-center mb-6 md:mb-10">
          <img
            src={dashboardImg}
            alt="Dashboard logo"
            className="w-auto h-14 md:h-20 object-contain"
          />
        </div>

        <MenuList />
      </aside>
    </>
  );
};

export default HrNav;