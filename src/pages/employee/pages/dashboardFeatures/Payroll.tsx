import { BadgeIndianRupee, FileText } from "lucide-react";
import FeaturePopupLayout from "./FeaturePopupLayout";

type PayrollProps = {
  onClose: () => void;
};

const Payroll = ({ onClose }: PayrollProps) => {
  return (
    <FeaturePopupLayout
      title="Payroll"
      bg="bg-[#FFEAF3]"
      icon={<BadgeIndianRupee size={20} className="text-[#F64086]" />}
      onClose={onClose}
      items={[
        {
          title: "Payslip",
          icon: <FileText size={24} className="text-[#6E7587]" />,
          onClick: () => console.log("Payslip"),
        },
        {
          title: "Salary Details",
          icon: <BadgeIndianRupee size={24} className="text-[#6E7587]" />,
          onClick: () => console.log("Salary Details"),
        },
      ]}
    />
  );
};

export default Payroll;