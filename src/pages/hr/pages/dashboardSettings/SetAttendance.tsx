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
    <div className="w-full flex items-center justify-center bg-transparent p-4 sm:p-0">

      
    <div className="w-full sm:w-[50%]  rounded-3xl mx-auto relative flex flex-col overflow-hidden bg-[#E9EBF7] px-6 sm:px-14 py-8 sm:py-10 min-h-[80vh]">
  
  {/* Close Button - solid blue */}
  <button
    onClick={onClose}
    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-md bg-[#5764B3] hover:bg-[#4a56a0] cursor-pointer transition-all duration-200 hover:scale-110"
    aria-label="Close"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  {/* Gradient decorations */}
  <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none hidden sm:block">
    <Gradient />
  </div>
  <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none hidden sm:block">
    <Gradient />
  </div>

  {/* Title with info icon */}
  <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#5863B2] mb-6 sm:mb-8 shrink-0 flex items-center justify-center gap-2">
    Set Attendance
    <span className="w-5 h-5 rounded-full border-2 border-[#5863B2] text-[#5863B2] text-xs flex items-center justify-center font-bold flex-shrink-0">
      i
    </span>
  </h1>

  <div className="flex flex-col gap-5 sm:gap-7 w-full">
    
    {/* Working Hours */}
    <div className="flex flex-row items-center justify-between">
      <label className="text-[#5863B2] text-base sm:text-xl font-bold w-[40%] text-left">
        Working Hours
      </label>
      <input
        type="text"
        value={workingHours}
        onChange={(event) => setWorkingHours(event.target.value)}
        className="p-3 sm:p-2 rounded-[10px] border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-[210px] text-[#5764B3] font-semibold text-base placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
      />
    </div>

    {/* Working Days */}
    <div className="flex flex-row gap-4 items-center">
      <label className="text-[#5863B2] text-base sm:text-xl font-bold w-[40%] text-left">
        Working Days
      </label>
      <div className="w-[42%]">
        <div className="flex gap-1">
          {days.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              className={`flex-1 text-center py-2 rounded-md border border-[#C9CAE5] shadow-sm text-[10px] font-medium transition-all ${
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

    {/* Start Time */}
    <div className="flex flex-row gap-4 items-center">
      <label className="text-[#5863B2] text-base sm:text-xl font-bold w-[40%] text-left">
        Start time
      </label>
      <input
        type="time"
        value={startTime}
        onChange={(event) => setStartTime(event.target.value)}
        className="p-3 sm:p-2 rounded-[10px] border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-[210px] text-[#5764B3] font-semibold text-base placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
      />
    </div>

    {/* End Time */}
    <div className="flex flex-row gap-4 items-center">
      <label className="text-[#5863B2] text-base sm:text-xl font-bold w-[40%] text-left">
        End time
      </label>
      <input
        type="time"
        value={endTime}
        onChange={(event) => setEndTime(event.target.value)}
        className="p-3 sm:p-2 rounded-[10px] border-2 border-[#5764B3]/40 bg-[#ECEEF8] outline-none w-[210px] text-[#5764B3] font-semibold text-base placeholder:text-[#5764B3] placeholder:font-semibold disabled:opacity-60"
      />
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="button"
    onClick={handleSubmit}
    disabled={saving}
    className={`mt-10 sm:mt-14 w-full sm:w-[300px] mx-auto text-white text-lg sm:text-xl font-bold p-3 sm:p-4 rounded-xl shadow hover:opacity-90 transition-opacity ${
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