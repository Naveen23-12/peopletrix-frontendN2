import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

import Gradient from "../../../../components/common/Gradient";
import { getAxiosErrorMessage } from "../../../../utils";
import {
  createLeavePolicyAPI,
  createHolidayPolicyAPI,
} from "../../../../features/hr/api";

import {
  validateLeavePolicy,
  validateHolidayPolicy,
  generateLeaveCode,
} from "../../../../utils/validations";

import { getCurrentYear, getWeekDayFromDate } from "../../../../utils";

type LeaveType = {
  name: string;
  code: string;
  totalDaysPerYear: number;
};

type HolidayRow = {
  name: string;
  date: string;
};

type SetLeavePolicyProps = {
  onClose: () => void;
};

const SetLeavePolicy = ({ onClose }: SetLeavePolicyProps) => {
  const [activeTab, setActiveTab] = useState<"leave" | "holiday">("leave");

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    {
      name: "",
      code: "",
      totalDaysPerYear: 0,
    },
  ]);

  const [totalLeaves, setTotalLeaves] = useState<number | "">("");
  const [savingLeave, setSavingLeave] = useState(false);

  const [holidays, setHolidays] = useState<HolidayRow[]>([
    {
      name: "",
      date: "",
    },
    {
      name: "",
      date: "",
    },
  ]);

  const [savingHoliday, setSavingHoliday] = useState(false);

  const handleLeaveChange = (
    index: number,
    key: keyof LeaveType,
    value: string | number
  ) => {
    setLeaveTypes((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      if (key === "name" && typeof value === "string") {
        updated[index].code = generateLeaveCode(value);
      }

      return updated;
    });
  };

  const handleAddLeave = () => {
    setLeaveTypes((prev) => [
      ...prev,
      {
        name: "",
        code: "",
        totalDaysPerYear: 0,
      },
    ]);
  };

  const handleDeleteLeave = (index: number) => {
    setLeaveTypes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitLeave = async () => {
    const validationError = validateLeavePolicy(leaveTypes);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSavingLeave(true);

    try {
      const response = await createLeavePolicyAPI({
        leavePolicy: leaveTypes.map((leave) => ({
          name: leave.name.trim(),
          code: leave.code || generateLeaveCode(leave.name),
          totalDaysPerYear: Number(leave.totalDaysPerYear),
        })),
        totalLeaves: totalLeaves === "" ? undefined : Number(totalLeaves),
      });

      const result = response.data;

      if (result.success) {
        toast.success("Leave policy saved successfully!");

        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        toast.error(result.message || "Failed to save leave policy");
      }
    } catch (error) {
      console.error("Leave policy error:", error);
      toast.error(getAxiosErrorMessage(error, "Server error. Try again."));
    } finally {
      setSavingLeave(false);
    }
  };

  const handleHolidayChange = (
    index: number,
    key: keyof HolidayRow,
    value: string
  ) => {
    setHolidays((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return updated;
    });
  };

  const handleAddHoliday = () => {
    setHolidays((prev) => [
      ...prev,
      {
        name: "",
        date: "",
      },
    ]);
  };

  const handleDeleteHoliday = (index: number) => {
    setHolidays((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitHoliday = async () => {
    const validationError = validateHolidayPolicy(holidays);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSavingHoliday(true);

    try {
      const currentYear = getCurrentYear();

      const formattedHolidays = holidays.map((holiday) => ({
        name: holiday.name.trim(),
        date: new Date(holiday.date),
        day: getWeekDayFromDate(holiday.date),
        type: "Public",
      }));

      const response = await createHolidayPolicyAPI({
        name: `${currentYear} Holiday Policy`,
        year: currentYear,
        holidays: formattedHolidays,
      });

      const result = response.data;

      if (result.success) {
        toast.success("Holiday policy saved successfully!");

        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        toast.error(result.message || "Failed to save holiday policy");
      }
    } catch (error) {
      console.error("Holiday policy error:", error);
      toast.error(getAxiosErrorMessage(error, "Server error. Try again."));
    } finally {
      setSavingHoliday(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-transparent p-4 sm:p-0">
      <div className="min-h-[80vh] w-full max-w-xs sm:max-w-[80%] sm:w-[50%] sm:min-w-[500px] rounded-3xl mx-auto relative flex flex-col overflow-hidden bg-[#E9EBF7] px-6 sm:p-10 py-8 sm:py-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg border border-[#5764B3]/50 cursor-pointer transition-all duration-200 hover:scale-110"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-[#5764B3] font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Gradient Decorations */}
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden w-full sm:w-[80%] mb-6 sm:mb-8 mx-auto bg-white shadow-sm z-10">
          <button
            type="button"
            onClick={() => setActiveTab("leave")}
            disabled={savingLeave || savingHoliday}
            className={`flex-1 rounded-xl p-3 sm:p-3 text-center text-base sm:text-xl font-bold transition-all disabled:opacity-60 ${
              activeTab === "leave"
                ? "text-white bg-[#5764B3]"
                : "text-[#5764B3] bg-white"
            }`}
          >
            Set leave policy
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("holiday")}
            disabled={savingLeave || savingHoliday}
            className={`flex-1 rounded-xl p-3 sm:p-3 text-center text-base sm:text-xl font-bold transition-all disabled:opacity-60 ${
              activeTab === "holiday"
                ? "text-white bg-[#5764B3]"
                : "text-[#5764B3] bg-white"
            }`}
          >
            Set holiday
          </button>
        </div>

        {/* Leave Policy */}
        {activeTab === "leave" && (
          <div className="animate-fadeIn z-10">
            {leaveTypes.map((leave, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4"
              >
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    placeholder="Leave Type"
                    value={leave.name}
                    onChange={(event) =>
                      handleLeaveChange(index, "name", event.target.value)
                    }
                    disabled={savingLeave}
                    className="p-3 sm:p-4 rounded-xl border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-full text-[#5764B3] font-semibold text-base sm:text-lg placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Days"
                      min={1}
                      value={leave.totalDaysPerYear || ""}
                      onChange={(event) =>
                        handleLeaveChange(
                          index,
                          "totalDaysPerYear",
                          Number(event.target.value)
                        )
                      }
                      disabled={savingLeave}
                      className="p-3 sm:p-4 rounded-xl border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-full text-[#5764B3] font-semibold text-base sm:text-lg placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
                    />

                    {leaveTypes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteLeave(index)}
                        disabled={savingLeave}
                        className="shrink-0 disabled:opacity-60"
                        aria-label="Delete leave type"
                      >
                        <FaTrash size={16} color="#5764B3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddLeave}
              disabled={savingLeave}
              className="flex items-center gap-2 text-[#5764B3] font-medium mt-8 sm:mt-10 text-sm sm:text-base disabled:opacity-60"
            >
              <span className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center rounded-md bg-[#5764B3] text-white text-xs sm:text-sm leading-none cursor-pointer">
                ＋
              </span>
              Add Leave
            </button>

            <div className="flex flex-col mt-8 sm:mt-12">
              <input
                type="number"
                placeholder="Total Leaves"
                value={totalLeaves}
                onChange={(event) =>
                  setTotalLeaves(
                    event.target.value === "" ? "" : Number(event.target.value)
                  )
                }
                disabled={savingLeave}
                className="p-3 sm:p-4 rounded-xl border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-full sm:w-80 text-[#5764B3] font-semibold text-base sm:text-lg placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmitLeave}
              disabled={savingLeave}
              className={`mt-8 sm:mt-10 mx-auto w-full sm:w-[260px] text-white text-lg sm:text-2xl font-bold py-4 sm:py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all ${
                savingLeave
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#5764B3] to-[#252B4D] hover:opacity-90"
              }`}
            >
              {savingLeave ? "Saving..." : "Submit"}
            </button>
          </div>
        )}

        {/* Holiday */}
        {activeTab === "holiday" && (
          <div className="animate-fadeIn z-10">
            {holidays.map((holiday, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6 sm:mb-10 sm:items-center"
              >
                <div className="flex flex-col w-full flex-1">
                  <input
                    type="text"
                    placeholder="Holiday Name"
                    value={holiday.name}
                    onChange={(event) =>
                      handleHolidayChange(index, "name", event.target.value)
                    }
                    disabled={savingHoliday}
                    className="p-3 sm:p-4 rounded-xl border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-full text-[#5764B3] font-semibold text-base sm:text-lg placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
                  />
                </div>

                <div className="flex flex-col w-full flex-1">
                  <input
                    type="date"
                    value={holiday.date}
                    onChange={(event) =>
                      handleHolidayChange(index, "date", event.target.value)
                    }
                    disabled={savingHoliday}
                    className="p-3 sm:p-4 rounded-xl border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-full text-[#5764B3] font-semibold text-base sm:text-lg disabled:opacity-60"
                  />
                </div>

                <div className="self-end mb-5 sm:self-center mt-2 sm:mt-0">
                  <button
                    type="button"
                    onClick={() => handleDeleteHoliday(index)}
                    disabled={savingHoliday || holidays.length <= 1}
                    className="disabled:opacity-40"
                    aria-label="Delete holiday"
                  >
                    <FaTrash size={18} color="#5764B3" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddHoliday}
              disabled={savingHoliday}
              className="flex items-center gap-2 text-[#5764B3] font-medium my-4 sm:my-5 text-sm sm:text-base disabled:opacity-60"
            >
              <span className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center rounded-md bg-[#5764B3] text-white text-xs sm:text-sm leading-none cursor-pointer">
                ＋
              </span>
              Add Holidays
            </button>

            <button
              type="button"
              onClick={handleSubmitHoliday}
              disabled={savingHoliday}
              className={`mt-8 sm:mt-10 mx-auto w-full sm:w-[260px] text-white text-lg sm:text-2xl font-bold py-4 sm:py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all ${
                savingHoliday
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#5764B3] to-[#252B4D] hover:opacity-90"
              }`}
            >
              {savingHoliday ? "Saving..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetLeavePolicy;