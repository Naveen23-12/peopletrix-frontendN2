import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { profileImg } from "../../../assets/images";

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

const Leave = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="w-full max-w-[960px] min-h-[560px] overflow-hidden">
      <div className="w-full min-h-[560px] bg-[#E6E8F5] rounded-[12px] p-4 sm:p-6 md:p-8 overflow-hidden">
        {/* Top Search */}
        <div className="w-full flex items-center justify-between gap-3 mb-8 max-[480px]:mb-5">
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
        <div className="w-full max-w-[786px] bg-[#F8F8FF] rounded-[22px] mb-8 overflow-hidden">
          <div className="w-full min-h-[98px] flex items-center justify-between gap-3 sm:gap-4 px-6 sm:px-10 lg:px-12">
            <h1 className="text-[#5863B2] text-[28px] sm:text-[34px] md:text-[38px] font-normal">
              Leave Management
            </h1>

            <img
              src={profileImg}
              alt="Leave Management"
              className="w-auto max-w-full h-[105px] sm:h-[125px] lg:h-[145px] object-contain self-end mr-0 lg:mr-6"
            />
          </div>
        </div>

        {/* Desktop / Tablet Table */}
        <div className="hidden md:block w-full max-w-full bg-[#E8EAF8] rounded-[22px] px-3 lg:px-[53px] py-2 lg:py-[10px] overflow-hidden">
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full min-w-[850px] border-separate border-spacing-y-[14px]">
              <thead>
                <tr className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]">
                  <th className="rounded-l-[8px] px-5 lg:px-8 text-center text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Legal Name
                  </th>

                  <th className="px-5 lg:px-8 text-center text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Employee ID
                  </th>

                  <th className="px-5 lg:px-8 text-center text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Taken Leave
                  </th>

                  <th className="rounded-r-[8px] px-5 lg:px-8 text-center text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
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
                      className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]"
                    >
                      <td className="rounded-l-[8px] px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {leave.legalName}
                      </td>

                      <td className="px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {leave.employeeId}
                      </td>

                      <td className="px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {leave.takenLeave}
                      </td>

                      <td className="rounded-r-[8px] px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
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
                className={`w-[30px] h-[30px] flex items-center justify-center text-[17px] lg:text-[18px] ${
                  currentPage === page
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

        {/* Mobile Cards */}
        <div className="md:hidden w-full max-w-full bg-[#E8EAF8] rounded-[18px] p-3 overflow-y-auto max-h-[330px]">
          {filteredLeaves.length === 0 ? (
            <div className="bg-[#F8F8FF] rounded-xl p-5 text-center text-[#5863B2]">
              No leave records found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="w-full max-w-full bg-[#F8F8FF] rounded-xl p-4 shadow-[0px_4px_6px_rgba(88,99,178,0.18)] overflow-hidden"
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
                      <span className="font-semibold shrink-0">
                        Taken Leave
                      </span>

                      <span className="text-right min-w-0">
                        {leave.takenLeave}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 min-w-0">
                      <span className="font-semibold shrink-0">
                        Available Leave
                      </span>

                      <span className="text-right min-w-0">
                        {leave.availableLeave}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Pagination */}
          <div className="flex items-center justify-center gap-3 mt-5 text-[#5863B2] overflow-hidden">
            <button className="text-[#2F73FF] shrink-0">
              <ChevronLeft size={24} />
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-[28px] h-[28px] shrink-0 flex items-center justify-center text-[15px] ${
                  currentPage === page
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
      </div>
    </div>
  );
};

export default Leave;