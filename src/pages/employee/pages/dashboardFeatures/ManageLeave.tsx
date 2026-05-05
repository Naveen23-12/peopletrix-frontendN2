import { CalendarDays, Clock3, FileCog } from "lucide-react";
import FeaturePopupLayout from "./FeaturePopupLayout";

type ManageLeaveProps = {
  onClose: () => void;
};

const ManageLeave = ({ onClose }: ManageLeaveProps) => {
  return (
    <FeaturePopupLayout
      title="Manage Leave"
      bg="bg-[#EAF3FF]"
      icon={<FileCog size={20} className="text-[#2F7DFF]" />}
      onClose={onClose}
      items={[
        {
          title: "Apply Leave",
          icon: <CalendarDays size={24} className="text-[#6E7587]" />,
          onClick: () => console.log("Apply Leave"),
        },
        {
          title: "Leave Records",
          icon: <Clock3 size={24} className="text-[#6E7587]" />,
          onClick: () => console.log("Leave Records"),
        },
      ]}
    />
  );
};

export default ManageLeave;