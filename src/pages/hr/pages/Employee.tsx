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

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-[90vw] max-w-[1200px] rounded-xl overflow-visible relative bg-transparent">
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
    <div className="w-full min-h-[650px] bg-[#F8F8FF] rounded-[28px] px-6 py-7">
      {/* Top Search */}
      <div className="flex items-center justify-between mb-12">
        <div className="w-full max-w-[500px] h-[40px] bg-[#E8EAF8] rounded-[13px] flex items-center px-5">
          <Search size={24} className="text-[#5863B2] mr-4" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent outline-none text-[#5863B2] placeholder:text-[#5863B2] text-[16px]"
          />
        </div>

        <button className="w-[41px] h-[40px] rounded-[10px] border border-[#5863B2] text-[#5863B2] font-bold text-[18px] flex items-center justify-center">
          v
        </button>
      </div>

      {/* Add Employee Banner */}
      <div className="w-full max-w-[786px] h-[145px] bg-[#E8EAF8] rounded-[22px] flex items-center justify-between px-11 mb-[54px]">
        <button
          onClick={() => setShowAddEmployee(true)}
          className="w-[257px] h-[57px] bg-[#F8F8FF] rounded-[10px] flex items-center justify-center gap-3 text-[#5863B2] text-[24px] font-normal"
        >
          <Plus size={28} strokeWidth={2} />
          Add Employee
        </button>

        <img
          src={profileImg}
          alt="Employee"
          className="h-[165px] object-contain self-end mr-10"
        />
      </div>

      {/* Table Section */}
      <div className="w-full max-w-[978px] bg-[#E8EAF8] rounded-[22px] px-[53px] py-[39px]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] border-separate border-spacing-y-[14px]">
            <thead>
              <tr className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]">
                <th className="rounded-l-[8px] px-8 text-left text-[15px] font-bold text-[#5863B2]">
                  Legal Name
                </th>
                <th className="px-8 text-left text-[15px] font-bold text-[#5863B2]">
                  Preferred Name
                </th>
                <th className="px-8 text-left text-[15px] font-bold text-[#5863B2]">
                  Employee ID
                </th>
                <th className="px-8 text-left text-[15px] font-bold text-[#5863B2]">
                  Status
                </th>
                <th className="rounded-r-[8px] px-8 text-left text-[15px] font-bold text-[#5863B2]">
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="h-[47px] bg-[#F8F8FF] shadow-[0px_4px_6px_rgba(88,99,178,0.18)]"
                >
                  <td className="rounded-l-[8px] px-8 text-[16px] text-[#5863B2] text-center">
                    {employee.legalName}
                  </td>

                  <td className="px-8 text-[16px] text-[#5863B2] text-center">
                    {employee.preferredName}
                  </td>

                  <td className="px-8 text-[16px] text-[#5863B2] text-center">
                    {employee.employeeId}
                  </td>

                  <td className="px-8 text-[16px] text-[#5863B2]">
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-[8px] h-[8px] rounded-full ${
                          statusColor[employee.status]
                        }`}
                      ></span>
                      {employee.status}
                    </div>
                  </td>

                  <td className="rounded-r-[8px] px-8 text-[16px] text-[#5863B2] text-center">
                    {employee.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-8 mt-5 text-[#5863B2]">
          <button className="text-[#2F73FF]">
            <ChevronLeft size={28} />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-[30px] h-[30px] flex items-center justify-center text-[18px] ${
                currentPage === page
                  ? "border border-[#5863B2] rounded-[2px]"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button className="text-[#2F73FF]">
            <ChevronRight size={28} />
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