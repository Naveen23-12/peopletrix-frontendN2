import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { profileImg } from "../../../assets/images";
import LeaveDetailsModal from "./leave/LeaveDetailsModal";
import type { LeaveEmployeeDetails } from "./leave/LeaveDetailsModal";

type LeaveData = {
  id: string;
  legalName: string;
  employeeId: string;
  takenLeave: string;
  availableLeave: string;
};

const leaveData: LeaveData[] = [
  {
    id: "1",
    legalName: "Abhinaya",
    employeeId: "#4567",
    takenLeave: "03 Days",
    availableLeave: "19 Days",
  },
  {
    id: "2",
    legalName: "Deva",
    employeeId: "#4568",
    takenLeave: "02 Days",
    availableLeave: "20 Days",
  },
  {
    id: "3",
    legalName: "Balasaravanan",
    employeeId: "#4569",
    takenLeave: "01 Days",
    availableLeave: "21 Days",
  },
  {
    id: "4",
    legalName: "Vijaykumar",
    employeeId: "#4570",
    takenLeave: "01 Days",
    availableLeave: "21 Days",
  },
  {
    id: "5",
    legalName: "Priyadarshini",
    employeeId: "#4571",
    takenLeave: "02 Days",
    availableLeave: "20 Days",
  },
  {
    id: "6",
    legalName: "sara",
    employeeId: "#4572",
    takenLeave: "01 Days",
    availableLeave: "21 Days",
  },
];

const leaveDetailsData: Record<string, LeaveEmployeeDetails> = {
  "1": {
    legalName: "Abhinaya",
    employeeId: "#4567",
    email: "Abhinaya@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=5",
    summary: [
      {
        title: "Total Sick Leave",
        total: "12 Days",
        taken: "03 Days",
        available: "09 Days",
      },
      {
        title: "Total Casual Leave",
        total: "10 Days",
        taken: "01 Days",
        available: "09 Days",
      },
    ],
    history: [
      {
        type: "Sick Leave",
        startDate: "12 Jan 2024",
        endDate: "13 Jan 2024",
        days: "02 Days",
        reason: "Fever",
      },
      {
        type: "Sick Leave",
        startDate: "05 Feb 2024",
        endDate: "05 Jan 2024",
        days: "01 Days",
        reason: "Fever",
      },
      {
        type: "Casual Leave",
        startDate: "22 Feb 2024",
        endDate: "22 Feb 2024",
        days: "01 Days",
        reason: "Personal emergencies",
      },
    ],
  },
};

const Leave = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] =
    useState<LeaveEmployeeDetails | null>(null);
  const filteredLeaves = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return leaveData;

    return leaveData.filter((leave) => {
      return (
        leave.legalName.toLowerCase().includes(keyword) ||
        leave.employeeId.toLowerCase().includes(keyword) ||
        leave.takenLeave.toLowerCase().includes(keyword) ||
        leave.availableLeave.toLowerCase().includes(keyword)
      );
    });
  }, [search]);


  const openLeaveDetails = (leave: LeaveData) => {
    setSelectedEmployee(
      leaveDetailsData[leave.id] || {
        legalName: leave.legalName,
        employeeId: leave.employeeId,
        email: `${leave.legalName.toLowerCase()}@gmail.com`,
        avatar: "https://i.pravatar.cc/100?img=5",
        summary: [
          {
            title: "Total Sick Leave",
            total: "12 Days",
            taken: leave.takenLeave,
            available: leave.availableLeave,
          },
          {
            title: "Total Casual Leave",
            total: "10 Days",
            taken: "01 Days",
            available: "09 Days",
          },
        ],
        history: [
          {
            type: "Sick Leave",
            startDate: "12 Jan 2024",
            endDate: "13 Jan 2024",
            days: leave.takenLeave,
            reason: "Fever",
          },
        ],
      }
    );
  };
  return (
    <div className="w-full max-w-[1600px] min-h-[560px] overflow-hidden">
      {/* Top Search */}
      <div className="w-full flex items-center justify-between gap-3 mb-8 max-[480px]:mb-5 overflow-hidden">
        <div className="w-full max-w-[500px] min-w-0 h-[40px] bg-[#F8F8FF] rounded-[13px] flex items-center px-3 sm:px-5">
          <Search
            size={22}
            className="text-[#5863B2] mr-3 sm:mr-4 shrink-0"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            className="w-full min-w-0 bg-transparent outline-none text-[#5863B2] placeholder:text-[#5863B2] text-[15px] sm:text-[16px]"
          />
        </div>

        <button className="shrink-0 w-[41px] h-[40px] rounded-[10px] border border-[#5863B2] text-[#5863B2] font-bold text-[18px] flex items-center justify-center">
          v
        </button>
      </div>

      {/* Leave Management Banner */}
      {/* <div className="w-full max-w-[786px] bg-[#F8F8FF] rounded-[22px] mb-8 overflow-hidden">
        <div className="w-full min-h-[145px] flex flex-row items-center justify-between gap-3 sm:gap-4 px-4 sm:px-8 lg:px-11 pt-5 sm:pt-0 relative max-[880px]:flex-col max-[880px]:align-center">
          <h1 className="text-[#5863B2] text-[24px] sm:text-[34px] lg:text-[38px] font-normal shrink-0">
            Leave Management
          </h1>

          <img
            src={profileImg}
            alt="Leave Management"
            className="w-auto max-w-[38%] h-[105px] sm:h-[145px] lg:h-[165px] object-contain self-center sm:self-end mr-0 lg:mr-10 shrink-0"
          />
        </div>
      </div> */}

      <div className="w-full max-w-[786px] bg-[#E8EAF8]  rounded-[22px] mb-8 overflow-hidden">
        <div
          className="
      w-full min-h-[145px]
      flex flex-row items-center justify-between
      gap-3
      px-4 sm:px-8 lg:px-11
      pt-5 sm:pt-0
      relative
      max-[880px]:min-h-[120px]
      max-[880px]:px-5
      max-[480px]:min-h-[105px]
      max-[480px]:px-4
    "
        >
          <h1
            className="
        text-[#5863B2]
        text-[24px] sm:text-[34px] lg:text-[38px]
        font-normal
        shrink
        max-[880px]:text-[26px]
        max-[600px]:text-[22px]
        max-[480px]:text-[20px]
        leading-tight
      "
          >
            Leave Management
          </h1>

          <img
            src={profileImg}
            alt="Leave Management"
            className="
        w-auto
        max-w-[38%]
        h-[105px] sm:h-[145px] lg:h-[165px]
        object-contain
        self-end
        mr-0 lg:mr-10
        shrink-0
        max-[880px]:h-[115px]
        max-[880px]:max-w-[34%]
        max-[600px]:h-[95px]
        max-[600px]:max-w-[32%]
        max-[480px]:h-[80px]
        max-[480px]:max-w-[30%]
      "
          />
        </div>
      </div>


      {/* Large Screen Table */}
      <div className="hidden lg:block w-full bg-[#E6E8F5] rounded-[12px] p-8 h-fit overflow-hidden">
        <div className="w-full max-w-full overflow-hidden">
          <table className="w-full table-fixed border-separate border-spacing-y-[14px]">
            <thead>
              <tr className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]">
                <th className="rounded-l-[8px] px-3 xl:px-8 text-center text-[14px] xl:text-[15px] font-bold text-[#5863B2]">
                  Legal Name
                </th>

                <th className="px-3 xl:px-8 text-center text-[14px] xl:text-[15px] font-bold text-[#5863B2]">
                  Employee ID
                </th>

                <th className="px-3 xl:px-8 text-center text-[14px] xl:text-[15px] font-bold text-[#5863B2]">
                  Taken Leave
                </th>

                <th className="rounded-r-[8px] px-3 xl:px-8 text-center text-[14px] xl:text-[15px] font-bold text-[#5863B2]">
                  Available Leave
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="h-[70px] bg-[#F8F8FF] rounded-[8px] text-center text-[#5863B2]"
                  >
                    No leave records found
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((leave) => (
                  <tr
                    key={leave.id}
                    onClick={() => openLeaveDetails(leave)}
                    className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)] cursor-pointer hover:bg-[#EEF0FF] transition"
                  >
                    <td className="rounded-l-[8px] px-3 xl:px-8 text-[14px] xl:text-[16px] text-[#5863B2] text-center truncate">
                      {leave.legalName}
                    </td>

                    <td className="px-3 xl:px-8 text-[14px] xl:text-[16px] text-[#5863B2] text-center truncate">
                      {leave.employeeId}
                    </td>

                    <td className="px-3 xl:px-8 text-[14px] xl:text-[16px] text-[#5863B2] text-center truncate">
                      {leave.takenLeave}
                    </td>

                    <td className="rounded-r-[8px] px-3 xl:px-8 text-[14px] xl:text-[16px] text-[#5863B2] text-center truncate">
                      {leave.availableLeave}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 lg:gap-8 mt-5 text-[#5863B2]">
          <button className="text-[#2F73FF]">
            <ChevronLeft size={26} />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-[30px] h-[30px] flex items-center justify-center text-[17px] lg:text-[18px] ${currentPage === page
                ? "border border-[#5863B2] rounded-[2px]"
                : ""
                }`}
            >
              {page}
            </button>
          ))}

          <button className="text-[#2F73FF]">
            <ChevronRight size={26} />
          </button>
        </div>
      </div>

      {/* Small + Medium Screen Card Design */}
      <div className="lg:hidden w-full max-w-full bg-[#E6E8F5] rounded-[12px] p-3 sm:p-5 overflow-hidden">
        {filteredLeaves.length === 0 ? (
          <div className="bg-[#F8F8FF] rounded-xl p-5 text-center text-[#5863B2]">
            No leave records found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredLeaves.map((leave) => (
              <div
                key={leave.id}
                onClick={() => openLeaveDetails(leave)}
                className="w-full min-w-0 bg-[#F8F8FF] rounded-xl p-4 shadow-[0px_4px_6px_rgba(88,99,178,0.18)] overflow-hidden cursor-pointer hover:bg-[#EEF0FF] transition"
              >
                <div className="flex items-start justify-between gap-3 mb-3 min-w-0">
                  <div className="min-w-0">
                    <h3 className="text-[#5863B2] font-bold text-[17px] break-words">
                      {leave.legalName}
                    </h3>

                    <p className="text-[#5863B2]/80 text-sm break-words">
                      Employee ID: {leave.employeeId}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-[#5863B2]">
                  <div className="flex justify-between gap-3 min-w-0">
                    <span className="font-semibold shrink-0">Taken Leave</span>

                    <span className="break-words text-right min-w-0">
                      {leave.takenLeave}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 min-w-0">
                    <span className="font-semibold shrink-0">
                      Available Leave
                    </span>

                    <span className="break-words text-right min-w-0">
                      {leave.availableLeave}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-5 text-[#5863B2] overflow-hidden">
          <button className="text-[#2F73FF] shrink-0">
            <ChevronLeft size={24} />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-[28px] h-[28px] shrink-0 flex items-center justify-center text-[15px] ${currentPage === page
                ? "border border-[#5863B2] rounded-[2px]"
                : ""
                }`}
            >
              {page}
            </button>
          ))}

          <button className="text-[#2F73FF] shrink-0">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      {selectedEmployee && (
        <LeaveDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

export default Leave;