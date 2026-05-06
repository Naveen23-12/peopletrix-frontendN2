import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Edit2, Info, Plus, Trash2, X } from "lucide-react";

import Gradient from "../../../../components/common/Gradient";
import { getAxiosErrorMessage } from "../../../../utils";
import {
  generateFieldKey,
  validateCustomFields,
} from "../../../../utils/validations";
import { createCustomFieldAPI } from "../../../../features/hr/api";

type SetEmployeeFieldsProps = {
  onClose: () => void;
};

type CustomField = {
  fieldKey: string;
  fieldLabel: string;
  fieldType: "string";
  required: boolean;
};

const SetEmployeeFields = ({ onClose }: SetEmployeeFieldsProps) => {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [saving, setSaving] = useState(false);
  const [scrollTopPercent, setScrollTopPercent] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const checkScrollable = () => {
    const element = scrollRef.current;
    if (!element) return;

    setIsScrollable(element.scrollHeight > element.clientHeight);
  };

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScroll = element.scrollHeight - element.clientHeight;
    setIsScrollable(maxScroll > 0);

    if (maxScroll <= 0) {
      setScrollTopPercent(0);
      return;
    }

    setScrollTopPercent((element.scrollTop / maxScroll) * 100);
  };

  const handleFieldChange = (index: number, value: string) => {
    setFields((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        fieldLabel: value,
        fieldKey: generateFieldKey(value),
      };

      return updated;
    });
  };

  const handleAddField = () => {
    const newIndex = fields.length;

    setFields((prev) => [
      ...prev,
      {
        fieldKey: "",
        fieldLabel: "",
        fieldType: "string",
        required: false,
      },
    ]);

    setTimeout(() => {
      inputRefs.current[newIndex]?.focus();
      checkScrollable();
    }, 100);
  };

  const handleDeleteField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));

    setTimeout(() => {
      checkScrollable();
    }, 100);
  };

  const handleEditField = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleSubmit = async () => {
    const validationError = validateCustomFields(fields);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSaving(true);

    try {
      await Promise.all(
        fields.map((field) =>
          createCustomFieldAPI({
            fieldKey: field.fieldKey || generateFieldKey(field.fieldLabel),
            fieldLabel: field.fieldLabel.trim(),
            fieldType: "string",
            required: field.required,
          })
        )
      );

      toast.success("Employee fields saved successfully!");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Employee fields error:", error);
      toast.error(getAxiosErrorMessage(error, "Server error. Try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-transparent p-4 sm:p-0">
      <div
        className="
          w-full
          max-w-[95%]
          sm:max-w-[650px]
          md:max-w-[700px]
          lg:w-[50%]
          h-[88vh]
          max-h-[610px]
          rounded-3xl
          mx-auto
          relative
          flex
          flex-col
          overflow-hidden
          bg-[#E9EBF7]
          px-5
          sm:px-10
          md:px-14
          py-8
          sm:py-10
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-md bg-[#5764B3] hover:bg-[#4a56a0] cursor-pointer transition-all duration-200 hover:scale-110"
          aria-label="Close"
        >
          <X size={18} className="text-white" strokeWidth={3} />
        </button>

        {/* Gradient decorations */}
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none hidden sm:block">
          <Gradient />
        </div>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative z-10 h-full min-h-0 overflow-y-auto overflow-x-hidden pr-8 employee-fields-scroll"
        >
          <div className="min-h-full flex flex-col justify-center">
            {/* Title */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <h1 className="text-[#5863B2] text-[20px] sm:text-[24px] font-semibold text-center">
                Set Employee Fields
              </h1>

              <span className="w-[16px] h-[16px] rounded-[3px] border border-[#5863B2] flex items-center justify-center shrink-0">
                <Info size={11} className="text-[#5863B2]" />
              </span>
            </div>

            {/* Dynamic custom fields */}
            {fields.length > 0 && (
              <div className="space-y-3 mt-3">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="
                      w-full
                      h-[42px]
                      rounded-[6px]
                      border
                      border-[#5863B2]
                      bg-transparent
                      flex
                      items-center
                      px-4
                      sm:px-5
                    "
                  >
                    <input
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      value={field.fieldLabel}
                      onChange={(event) =>
                        handleFieldChange(index, event.target.value)
                      }
                      placeholder="Field Name"
                      disabled={saving}
                      className="
                        flex-1
                        min-w-0
                        bg-transparent
                        outline-none
                        text-[#5863B2]
                        placeholder:text-[#5863B2]
                        text-[13px]
                        sm:text-[14px]
                      "
                    />

                    <div className="flex items-center gap-4 ml-3">
                      <button
                        type="button"
                        onClick={() => handleEditField(index)}
                        disabled={saving}
                        className="text-[#5863B2] disabled:opacity-50"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteField(index)}
                        disabled={saving}
                        className="text-[#5863B2] disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add field */}
            <button
              type="button"
              onClick={handleAddField}
              disabled={saving}
              className="
                flex
                items-center
                justify-center
                gap-3
                text-[#5863B2]
                text-[17px]
                font-semibold
                mx-auto
                mt-6
                disabled:opacity-50
              "
            >
              <span className="w-[15px] h-[15px] rounded-[2px] bg-[#5863B2] flex items-center justify-center">
                <Plus size={12} className="text-white" strokeWidth={3} />
              </span>
              Add new field
            </button>

            {/* Submit - only show after field added */}
            {fields.length > 0 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className={`
                  mt-5
                  mx-auto
                  w-[153px]
                  h-[37px]
                  rounded-[9px]
                  flex
                  items-center
                  justify-center
                  text-white
                  text-[19px]
                  font-bold
                  shadow
                  ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-b from-[#5764B3] to-[#252B4D]"
                  }
                `}
              >
                {saving ? "Saving..." : "Submit"}
              </button>
            )}
          </div>
        </div>

        {/* Custom scrollbar - appears only when needed */}
        {isScrollable && (
          <div className="absolute right-4 sm:right-6 top-[92px] bottom-[42px] z-20 w-[8px] rounded-full bg-[#D7DBF0]">
            <div
              className="absolute left-0 w-[8px] h-[95px] rounded-full bg-[#5863B2]"
              style={{
                top: `calc((100% - 95px) * ${scrollTopPercent / 100})`,
              }}
            />
          </div>
        )}

        <style>{`
          .employee-fields-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .employee-fields-scroll::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SetEmployeeFields;