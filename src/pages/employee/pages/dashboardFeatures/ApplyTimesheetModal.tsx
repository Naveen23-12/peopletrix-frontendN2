import { useMemo, useState } from "react";
import { X, CalendarDays, IdCard } from "lucide-react";

type ApplyTimesheetModalProps = {
  onClose: () => void;
};

type Period = "AM" | "PM";

const hours = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);

const minutes = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0"),
);

const convertToMinutes = (hour: string, minute: string, period: Period) => {
  let hourNumber = Number(hour);

  if (period === "AM" && hourNumber === 12) {
    hourNumber = 0;
  }

  if (period === "PM" && hourNumber !== 12) {
    hourNumber += 12;
  }

  return hourNumber * 60 + Number(minute);
};

const calculateTotalHours = (
  fromHour: string,
  fromMinute: string,
  fromPeriod: Period,
  toHour: string,
  toMinute: string,
  toPeriod: Period,
) => {
  const startMinutes = convertToMinutes(fromHour, fromMinute, fromPeriod);
  const endMinutes = convertToMinutes(toHour, toMinute, toPeriod);

  if (endMinutes <= startMinutes) {
    return "0hr 0 min";
  }

  const difference = endMinutes - startMinutes;
  const totalHours = Math.floor(difference / 60);
  const totalMinutes = difference % 60;

  return `${totalHours}hr ${totalMinutes} min`;
};

const ApplyTimesheetModal = ({ onClose }: ApplyTimesheetModalProps) => {
  const [date, setDate] = useState("2026-04-13");

  const [fromHour, setFromHour] = useState("09");
  const [fromMinute, setFromMinute] = useState("10");
  const [fromPeriod, setFromPeriod] = useState<Period>("AM");

  const [toHour, setToHour] = useState("05");
  const [toMinute, setToMinute] = useState("30");
  const [toPeriod, setToPeriod] = useState<Period>("PM");

  const [notes, setNotes] = useState("");

  const totalHours = useMemo(() => {
    return calculateTotalHours(
      fromHour,
      fromMinute,
      fromPeriod,
      toHour,
      toMinute,
      toPeriod,
    );
  }, [fromHour, fromMinute, fromPeriod, toHour, toMinute, toPeriod]);

  const handleSubmit = () => {
    const timesheetData = {
      employeeId: "EMP001",
      employeeName: "Abhinaya",
      date,
      from: `${fromHour}:${fromMinute} ${fromPeriod}`,
      to: `${toHour}:${toMinute} ${toPeriod}`,
      totalHours,
      notes,
    };

    console.log("TIMESHEET DATA:", timesheetData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        <div className="relative w-full max-w-[800px] min-h-[620px] rounded-[22px] bg-[#E9EBF7] px-6 sm:px-[72px] py-8 sm:py-[60px] overflow-hidden">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-8 right-10 w-[31px] h-[31px] bg-[#5863B2] rounded-[4px] flex items-center justify-center"
          >
            <X size={24} className="text-white" strokeWidth={3} />
          </button>

          {/* Title */}
          <div className="mb-12">
            <h1 className="text-[#5863B2] text-[30px] sm:text-[34px] font-semibold">
              Apply Timesheet
            </h1>

            <p className="text-[#8C8C8C] text-[18px] sm:text-[20px] font-semibold mt-2">
              Fill in your work hours for the selected date range.
            </p>
          </div>

          {/* Employee ID and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[65px] mb-8">
            <div>
              <label className="block text-[#5863B2] text-[20px] mb-5">
                Employee ID
              </label>

              <div className="relative">
                <input
                  type="text"
                  defaultValue="EMP001"
                  className="w-full h-[36px] rounded-[5px] bg-[#F8F8FF] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] px-4 pr-10 outline-none text-[#A5A5A5] text-[14px]"
                />

                <IdCard
                  size={17}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9EA0AE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#5863B2] text-[20px] mb-5">
                Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full h-[36px] rounded-[5px] bg-[#F8F8FF] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] px-4 pr-10 outline-none text-[#A5A5A5] text-[14px]"
                />

                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9EA0AE]"
                />
              </div>
            </div>
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_130px] gap-8 md:gap-[36px] mb-8">
            {/* From */}
            <div>
              <label className="block text-[#5863B2] text-[20px] mb-5">
                From
              </label>

              <div className="flex gap-4">
                <div className="w-[106px] h-[34px] bg-[#F8F8FF] rounded-[5px] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] flex items-center justify-center gap-1 text-[14px]">
                  <select
                    value={fromHour}
                    onChange={(event) => setFromHour(event.target.value)}
                    className="w-[38px] bg-transparent outline-none text-center"
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>

                  <span className="text-[#5863B2]">:</span>

                  <select
                    value={fromMinute}
                    onChange={(event) => setFromMinute(event.target.value)}
                    className="w-[38px] bg-transparent outline-none text-center"
                  >
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={fromPeriod}
                  onChange={(event) =>
                    setFromPeriod(event.target.value as Period)
                  }
                  className="w-[82px] h-[34px] bg-[#F8F8FF] rounded-[5px] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] px-3 outline-none text-[14px]"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-[#5863B2] text-[20px] mb-5">
                To
              </label>

              <div className="flex gap-4">
                <div className="w-[106px] h-[34px] bg-[#F8F8FF] rounded-[5px] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] flex items-center justify-center gap-1 text-[14px]">
                  <select
                    value={toHour}
                    onChange={(event) => setToHour(event.target.value)}
                    className="w-[38px] bg-transparent outline-none text-center"
                  >
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>

                  <span className="text-[#5863B2]">:</span>

                  <select
                    value={toMinute}
                    onChange={(event) => setToMinute(event.target.value)}
                    className="w-[38px] bg-transparent outline-none text-center"
                  >
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={toPeriod}
                  onChange={(event) =>
                    setToPeriod(event.target.value as Period)
                  }
                  className="w-[82px] h-[34px] bg-[#F8F8FF] rounded-[5px] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] px-3 outline-none text-[14px]"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            {/* Total Hours */}
            <div>
              <label className="block text-[#5863B2] text-[20px] mb-5">
                Total Hours
              </label>

              <input
                type="text"
                value={totalHours}
                readOnly
                className="w-full h-[34px] bg-[#F8F8FF] rounded-[5px] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] px-4 text-center outline-none text-[14px]"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-10">
            <label className="block text-[#5863B2] text-[20px] mb-5">
              Notes (Optional)
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add any note here..."
              className="w-full h-[138px] resize-none rounded-[10px] bg-[#F8F8FF] border border-[#D9D9E8] shadow-[0px_2px_5px_rgba(0,0,0,0.18)] px-5 py-6 outline-none text-[#5863B2] placeholder:text-[#B3B3B3]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-6">
            <button
              type="button"
              onClick={onClose}
              className="w-[102px] h-[46px] rounded-[5px] bg-[#F8F8FF] shadow-[0px_2px_5px_rgba(0,0,0,0.22)] text-black"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-[100px] h-[46px] rounded-[5px] bg-[#5863B2] text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyTimesheetModal;
