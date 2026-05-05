import { FileText } from "lucide-react";
import FeaturePopupLayout from "./FeaturePopupLayout";

type PolicyDocumentProps = {
  onClose: () => void;
};

const PolicyDocument = ({ onClose }: PolicyDocumentProps) => {
  return (
    <FeaturePopupLayout
      title="Policy Document"
      bg="bg-[#F0EDFF]"
      icon={<FileText size={20} className="text-[#6548F4]" />}
      onClose={onClose}
      items={[
        {
          title: "View Documents",
          icon: <FileText size={24} className="text-[#6E7587]" />,
          onClick: () => console.log("View Documents"),
        },
      ]}
    />
  );
};

export default PolicyDocument;