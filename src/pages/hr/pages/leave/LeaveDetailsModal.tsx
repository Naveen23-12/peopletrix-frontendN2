import { useRef, useState, type ReactNode } from "react";
import { CalendarDays, CheckSquare, Clock3, Plus, X } from "lucide-react";

type LeaveSummary = {
  title: string;
  total: string;
  taken: string;
  available: string;
};

type LeaveHistory = {
  type: string;
  startDate: string;
  endDate: string;
  days: string;
  reason: string;
};

export type LeaveEmployeeDetails = {
  legalName: string;
  employeeId: string;
  email: string;
  avatar: string;
  summary: LeaveSummary[];
  history: LeaveHistory[];
};

type LeaveDetailsModalProps = {
  employee: LeaveEmployeeDetails;
  onClose: () => void;
};

type SummaryBlockProps = {
  icon: ReactNode;
  title: string;
  value: string;
  border?: boolean;
};

const SummaryBlock = ({ icon, title, value, border }: SummaryBlockProps) => (
  <div
    className={`px-4 py-4 flex flex-col justify-center bg-[#EDF0FB] border-b sm:border-b-0 border-[#C9CCE0] ${
      border ? "sm:border-r" : ""
    }`}
  >
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <p className="text-[#5863B2] text-[15px] font-bold leading-snug break-words">
        {title}
      </p>
    </div>

    <p className="text-[#5863B2] text-[18px] font-medium">{value}</p>
  </div>
);

const LeaveDetailsModal = ({ employee, onClose }: LeaveDetailsModalProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollTopPercent, setScrollTopPercent] = useState(0);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScroll = element.scrollHeight - element.clientHeight;
    setScrollTopPercent(maxScroll <= 0 ? 0 : (element.scrollTop / maxScroll) * 100);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        <div className="relative w-full max-w-[800px] h-[92vh] rounded-[22px] bg-[#E9EBF7] overflow-hidden px-5 sm:px-10 md:px-[74px] py-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[#3B8BEF] blur-[70px] opacity-70 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[180px] h-[180px] bg-[#3B8BEF] blur-[70px] opacity-70 pointer-events-none" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-8 right-10 z-20 w-[31px] h-[31px] bg-[#5863B2] rounded-[4px] flex items-center justify-center"
          >
            <X size={24} className="text-white" strokeWidth={3} />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="relative z-10 h-full overflow-y-auto overflow-x-hidden pr-6 leave-details-scroll"
          >
            <div className="flex items-center gap-5 pt-12 sm:pt-10 mb-5">
              <img
                src={employee.avatar}
                alt={employee.legalName}
                className="w-[78px] h-[78px] rounded-full object-cover shrink-0"
              />

              <div className="min-w-0">
                <h2 className="text-[#5863B2] text-[24px] font-bold leading-tight">
                  {employee.legalName}
                </h2>

                <p className="text-[#999999] text-[20px] mt-2 break-words max-[520px]:text-[15px]">
                  {employee.employeeId} | Email : {employee.email}
                </p>
              </div>
            </div>

            <hr className="border-[#A6A6A6] mb-6" />

            <div className="space-y-5 mb-6">
              {employee.summary.map((item, index) => {
                const isSick = item.title.includes("Sick");

                const totalIcon = (
                  <div
                    className={`w-[31px] h-[31px] rounded-[4px] flex items-center justify-center shrink-0 ${
                      isSick ? "bg-[#4BB3D8]" : "bg-[#FFD58E]"
                    }`}
                  >
                    {isSick ? (
                      <Plus size={25} className="text-white" strokeWidth={4} />
                    ) : (
                      <Clock3 size={20} className="text-white" />
                    )}
                  </div>
                );

                return (
                  <div
                    key={index}
                    className="w-full rounded-[13px] border-2 border-[#C9CCE0] bg-transparent overflow-hidden grid grid-cols-1 sm:grid-cols-3"
                  >
                    <SummaryBlock
                      icon={totalIcon}
                      title={item.title}
                      value={item.total}
                      border
                    />

                    <SummaryBlock
                      icon={<CalendarDays size={31} className="text-[#FF8A80] shrink-0" />}
                      title="Taken Leave"
                      value={item.taken}
                      border
                    />

                    <SummaryBlock
                      icon={<CheckSquare size={31} className="text-[#75B88F] shrink-0" />}
                      title="Available Leave"
                      value={item.available}
                    />
                  </div>
                );
              })}
            </div>

            <hr className="border-[#A6A6A6] mb-5" />

            <div className="space-y-0">
              {employee.history.map((leave, index) => (
                <div key={index}>
                  <div className="py-5">
                    <h3 className="text-[#5863B2] text-[24px] font-bold mb-3">
                      {leave.type}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[#5863B2] text-[22px] font-bold mb-3">
                      <CalendarDays size={31} className="text-[#5863B2] shrink-0" />
                      <span>{leave.startDate}</span>
                      <span className="text-[#9AA0C0]">→</span>
                      <span>{leave.endDate}</span>
                      <span className="text-[#5863B2] px-4">|</span>
                      <span>{leave.days}</span>
                    </div>

                    <p className="text-[#5863B2] text-[22px] font-bold">
                      {leave.reason}
                    </p>
                  </div>

                  <hr className="border-[#A6A6A6]" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-8 top-[170px] bottom-8 z-20 w-[8px] rounded-full bg-[#D7DBF0]">
            <div
              className="absolute left-0 w-[8px] h-[95px] rounded-full bg-[#5863B2]"
              style={{ top: `calc((100% - 95px) * ${scrollTopPercent / 100})` }}
            />
          </div>

          <style>{`
            .leave-details-scroll {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }

            .leave-details-scroll::-webkit-scrollbar {
              width: 0;
              height: 0;
              display: none;
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default LeaveDetailsModal;