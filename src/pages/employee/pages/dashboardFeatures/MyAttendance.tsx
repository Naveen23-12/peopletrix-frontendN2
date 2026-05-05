import { useState } from "react";
import { CalendarDays, Clock3, UserCheck, UsersRound } from "lucide-react";
import FeaturePopupLayout from "./FeaturePopupLayout";
import ApplyTimesheetModal from "./ApplyTimesheetModal";

type MyAttendanceProps = {
  onClose: () => void;
};

const MyAttendance = ({ onClose }: MyAttendanceProps) => {
  const [showTimesheet, setShowTimesheet] = useState(false);

  return (
    <>
      <FeaturePopupLayout
        title="My Attendance"
        bg="bg-[#FFF3E2]"
        icon={<UserCheck size={20} className="text-[#FF8A00]" />}
        onClose={onClose}
        items={[
          {
            title: "Apply Timesheet",
            icon: <CalendarDays size={24} className="text-[#6E7587]" />,
            onClick: () => setShowTimesheet(true),
          },
          {
            title: "Attendance Records",
            icon: <Clock3 size={24} className="text-[#6E7587]" />,
            onClick: () => console.log("Attendance Records"),
          },
          {
            title: "Manage Attendance",
            icon: <UsersRound size={24} className="text-[#6E7587]" />,
            onClick: () => console.log("Manage Attendance"),
          },
        ]}
      />

      {showTimesheet && (
        <ApplyTimesheetModal onClose={() => setShowTimesheet(false)} />
      )}
    </>
  );
};

export default MyAttendance;