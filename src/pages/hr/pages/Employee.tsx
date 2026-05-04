import { useMemo, useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { AddEmployee } from "./employeeAdd";
import { profileImg } from "../../../assets/images";

type EmployeeData = {
  id: string;
  legalName: string;
  preferredName: string;
  employeeId: string;
  status: "Active" | "Resigned" | "Suspended" | "Probation" | "Notice";
  email: string;
};

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const employees: EmployeeData[] = [
  {
    id: "1",
    legalName: "Abhinaya",
    preferredName: "Abhi",
    employeeId: "#4567",
    status: "Active",
    email: "abhi@gmail",
  },
  {
    id: "2",
    legalName: "Deva",
    preferredName: "Deva",
    employeeId: "#4568",
    status: "Resigned",
    email: "deva@gmail",
  },
  {
    id: "3",
    legalName: "Balasaravanan",
    preferredName: "Bala",
    employeeId: "#4569",
    status: "Suspended",
    email: "bala@gmail",
  },
  {
    id: "4",
    legalName: "Vijaykumar",
    preferredName: "Vijay",
    employeeId: "#4570",
    status: "Probation",
    email: "vijay@gmail",
  },
  {
    id: "5",
    legalName: "Priyadarshini",
    preferredName: "Priya",
    employeeId: "#4571",
    status: "Notice",
    email: "priya@gmail",
  },
  {
    id: "6",
    legalName: "sara",
    preferredName: "Sara",
    employeeId: "#4572",
    status: "Active",
    email: "sara@gmail",
  },
];

const statusColor: Record<EmployeeData["status"], string> = {
  Active: "bg-[#5CEA35]",
  Resigned: "bg-[#F00606]",
  Suspended: "bg-[#F00606]",
  Probation: "bg-[#18BEEB]",
  Notice: "bg-[#F06A06]",
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
        <div className="w-full max-w-[95vw] sm:max-w-[1200px] rounded-xl overflow-hidden relative bg-transparent">
          {children}
        </div>
      </div>
    </>
  );
};

const Employee = () => {
  const [search, setSearch] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return employees;

    return employees.filter((employee) => {
      return (
        employee.legalName.toLowerCase().includes(keyword) ||
        employee.preferredName.toLowerCase().includes(keyword) ||
        employee.employeeId.toLowerCase().includes(keyword) ||
        employee.status.toLowerCase().includes(keyword) ||
        employee.email.toLowerCase().includes(keyword)
      );
    });
  }, [search]);

  return (
    
  <div className="w-full max-w-[960px] min-h-[560px] overflow-hidden">
    
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

        {/* Add Employee Banner */}
        <div className="w-full max-w-[786px] bg-[#F8F8FF] rounded-[22px] mb-8 overflow-hidden">
          <div className="w-full min-h-[145px] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-4 sm:px-8 lg:px-11 pt-5 sm:pt-0">
            <button
              onClick={() => setShowAddEmployee(true)}
              className="w-full max-w-[257px] h-[57px] bg-[#E8EAF8] rounded-[10px] flex items-center justify-center gap-3 text-[#5863B2] text-[20px] sm:text-[24px] font-normal shrink-0"
            >
              <Plus size={28} strokeWidth={2} />
              Add Employee
            </button>

            <img
              src={profileImg}
              alt="Employee"
              className="w-auto max-w-full h-[115px] sm:h-[145px] lg:h-[165px] object-contain self-center sm:self-end mr-0 lg:mr-10"
            />
          </div>
        </div>

        {/* Desktop / Tablet Table */}
        <div className="hidden md:block w-full max-w-full bg-[#E8EAF8] rounded-[22px] px-3 lg:px-[53px] py-5 lg:py-[30px] overflow-hidden">
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full min-w-[850px] border-separate border-spacing-y-[14px]">
              <thead>
                <tr className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]">
                  <th className="rounded-l-[8px] px-5 lg:px-8 text-left text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Legal Name
                  </th>
                  <th className="px-5 lg:px-8 text-left text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Preferred Name
                  </th>
                  <th className="px-5 lg:px-8 text-left text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Employee ID
                  </th>
                  <th className="px-5 lg:px-8 text-left text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Status
                  </th>
                  <th className="rounded-r-[8px] px-5 lg:px-8 text-left text-[14px] lg:text-[15px] font-bold text-[#5863B2]">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="h-[70px] bg-[#F8F8FF] rounded-[8px] text-center text-[#5863B2]"
                    >
                      No employees found
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]"
                    >
                      <td className="rounded-l-[8px] px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {employee.legalName}
                      </td>

                      <td className="px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {employee.preferredName}
                      </td>

                      <td className="px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {employee.employeeId}
                      </td>

                      <td className="px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <span
                            className={`w-[8px] h-[8px] rounded-full shrink-0 ${
                              statusColor[employee.status]
                            }`}
                          ></span>
                          {employee.status}
                        </div>
                      </td>

                      <td className="rounded-r-[8px] px-5 lg:px-8 text-[15px] lg:text-[16px] text-[#5863B2] text-center whitespace-nowrap">
                        {employee.email}
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
          {filteredEmployees.length === 0 ? (
            <div className="bg-[#F8F8FF] rounded-xl p-5 text-center text-[#5863B2]">
              No employees found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="w-full max-w-full bg-[#F8F8FF] rounded-xl p-4 shadow-[0px_4px_6px_rgba(88,99,178,0.18)] overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-3 min-w-0">
                    <div className="min-w-0">
                      <h3 className="text-[#5863B2] font-bold text-[17px] break-words">
                        {employee.legalName}
                      </h3>
                      <p className="text-[#5863B2]/80 text-sm break-words">
                        Preferred: {employee.preferredName}
                      </p>
                    </div>

                    <span className="text-[#5863B2] text-sm font-semibold shrink-0">
                      {employee.employeeId}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-[#5863B2]">
                    <div className="flex justify-between gap-3 min-w-0">
                      <span className="font-semibold shrink-0">Status</span>

                      <span className="flex items-center gap-2 min-w-0 text-right">
                        <span
                          className={`w-[8px] h-[8px] rounded-full shrink-0 ${
                            statusColor[employee.status]
                          }`}
                        ></span>
                        {employee.status}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 min-w-0">
                      <span className="font-semibold shrink-0">Email</span>

                      <span className="break-all text-right min-w-0">
                        {employee.email}
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
      

      {showAddEmployee && (
        <ModalWrapper onClose={() => setShowAddEmployee(false)}>
          <AddEmployee
            onClose={() => setShowAddEmployee(false)}
            onAdded={() => setShowAddEmployee(false)}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default Employee;