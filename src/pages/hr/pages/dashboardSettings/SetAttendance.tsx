import { useState } from "react";
import { toast } from "react-hot-toast";

import Gradient from "../../../../components/common/Gradient";
import { getAxiosErrorMessage } from "../../../../utils";

import { createAttendancePolicyAPI } from "../../../../features/hr/api";

type SetAttendanceProps = {
  onClose: () => void;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SetAttendance = ({ onClose }: SetAttendanceProps) => {
  const [workingHours, setWorkingHours] = useState("");
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleDay = (day: string) => {
    setWorkingDays((prev) =>
      prev.includes(day)
        ? prev.filter((item) => item !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!workingHours.trim()) {
      toast.error("Please enter working hours");
      return;
    }

    if (workingDays.length === 0) {
      toast.error("Please select working days");
      return;
    }

    if (!startTime || !endTime) {
      toast.error("Please select start and end time");
      return;
    }

    setSaving(true);

    try {
      const response = await createAttendancePolicyAPI({
  workingHours,
  workingDays,
  startTime,
  endTime,
});

      const result = response.data;

      if (result.success) {
        toast.success("Attendance policy saved successfully!");
        setTimeout(() => onClose(), 1200);
      } else {
        toast.error(result.message || "Failed to save attendance policy");
      }
    } catch (error) {
      console.error("Attendance policy error:", error);
      toast.error(getAxiosErrorMessage(error, "Server error. Try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent p-4 sm:p-0">
      <div className="w-full max-w-sm sm:max-w-[80%] sm:w-[50%] sm:min-w-[500px] rounded-3xl mx-auto relative flex flex-col overflow-hidden bg-[#E9EBF7] px-6 sm:px-20 py-8 sm:py-12 min-h-[80vh]">
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

        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#5863B2] mb-6 sm:mb-8 shrink-0">
          Set Attendance
        </h1>

        <div className="flex flex-col gap-4 sm:gap-5 w-full flex-1">
          <div className="flex flex-col sm:flex-row sm:gap-8 sm:justify-around sm:items-center">
            <label className="text-[#5863B2] text-lg sm:text-2xl font-bold w-full sm:w-[45%] text-left mb-2 sm:mb-0">
              Working Hours
            </label>

            <input
              type="text"
              value={workingHours}
              onChange={(event) => setWorkingHours(event.target.value)}
              className="p-3 sm:p-4 rounded-lg outline-none border border-[#C9CAE5] bg-white shadow-sm w-full sm:w-[55%] text-base sm:text-lg"
              placeholder="9:00 AM - 6:00 PM"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-8 sm:items-center">
            <label className="text-[#5863B2] text-lg sm:text-2xl font-bold w-full sm:w-[45%] text-left mb-2 sm:mb-0">
              Working Days
            </label>

            <div className="w-full sm:w-[55%]">
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 sm:gap-3">
                {days.map((day) => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`text-center py-2 sm:py-3 rounded-md border border-[#C9CAE5] shadow-sm text-sm sm:text-[15px] font-medium h-12 flex items-center justify-center transition-all ${
                      workingDays.includes(day)
                        ? "bg-[#5764B3] text-white"
                        : "bg-white text-[#5863B2]"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-8 sm:items-center">
            <label className="text-[#5863B2] text-lg sm:text-2xl font-bold w-full sm:w-[45%] text-left mb-2 sm:mb-0">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className="p-3 sm:p-4 rounded-lg outline-none border border-[#C9CAE5] bg-white shadow-sm w-full sm:w-[55%] text-base sm:text-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-8 sm:items-center">
            <label className="text-[#5863B2] text-lg sm:text-2xl font-bold w-full sm:w-[45%] text-left mb-2 sm:mb-0">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              className="p-3 sm:p-4 rounded-lg outline-none border border-[#C9CAE5] bg-white shadow-sm w-full sm:w-[55%] text-base sm:text-lg"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className={`mt-8 sm:mt-12 w-full sm:w-[260px] mx-auto text-white text-lg sm:text-2xl font-bold p-3 sm:p-4 rounded-xl shadow hover:opacity-90 ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
          }`}
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SetAttendance;