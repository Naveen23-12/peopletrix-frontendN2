import type { ReactNode } from "react";
import { ChevronRight, X } from "lucide-react";

type FeaturePopupItem = {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
};

type FeaturePopupLayoutProps = {
  title: string;
  icon: ReactNode;
  bg: string;
  items: FeaturePopupItem[];
  onClose: () => void;
};

const FeaturePopupLayout = ({
  title,
  icon,
  bg,
  items,
  onClose,
}: FeaturePopupLayoutProps) => {
  return (
    <div className="bg-white rounded-[8px] shadow-[0px_4px_18px_rgba(0,0,0,0.22)] px-6 py-5 min-h-[210px] w-full max-w-[370px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div
            className={`w-[34px] h-[34px] rounded-[4px] ${bg} flex items-center justify-center`}
          >
            {icon}
          </div>

          <h3 className="text-black text-[15px] font-semibold">{title}</h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-[#6E7587] hover:text-[#5863B2]"
        >
          <X size={22} />
        </button>
      </div>

      <div className="space-y-4 pl-[47px]">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={item.onClick}
            className="w-full flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-5">
              {item.icon}

              <span className="text-black text-[15px]">{item.title}</span>
            </div>

            <ChevronRight
              size={22}
              className="text-[#6E7587] group-hover:text-[#5863B2]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturePopupLayout;