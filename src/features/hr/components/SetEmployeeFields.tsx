import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Gradient from "../../../components/common/Gradient";
import {
  getCustomFieldsAPI,
  createCustomFieldAPI,
} from "../api";
import { getAxiosErrorMessage } from "../../../utils";

type CustomField = {
  _id?: string;
  fieldKey: string;
  fieldLabel: string;
  fieldType: "string";
  required: boolean;
};

type SetEmployeeFieldsProps = {
  onClose: () => void;
};

const SetEmployeeFields = ({ onClose }: SetEmployeeFieldsProps) => {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await getCustomFieldsAPI();
        const result = response.data;

        if (result.success && result.data?.length > 0) {
          setFields(
            result.data.map((field: CustomField) => ({
              _id: field._id,
              fieldKey: field.fieldKey,
              fieldLabel: field.fieldLabel,
              fieldType: "string",
              required: field.required,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch custom fields:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchFields();
  }, []);

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      {
        fieldKey: "",
        fieldLabel: "",
        fieldType: "string",
        required: false,
      },
    ]);
  };

  const handleChange = (
    index: number,
    key: keyof CustomField,
    value: string | boolean
  ) => {
    setFields((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      if (key === "fieldLabel" && typeof value === "string") {
        updated[index].fieldKey = value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "");
      }

      return updated;
    });
  };

  const handleDelete = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const hasEmpty = fields.some((field) => !field.fieldLabel.trim());

    if (hasEmpty) {
      toast.error("All field names must be filled in");
      return;
    }

    const labels = fields.map((field) => field.fieldLabel.trim().toLowerCase());
    const hasDuplicates = labels.length !== new Set(labels).size;

    if (hasDuplicates) {
      toast.error("Field names must be unique");
      return;
    }

    const newFields = fields.filter((field) => !field._id);

    if (newFields.length === 0) {
      toast.success("No new fields to save!");
      setTimeout(() => onClose(), 1000);
      return;
    }

    setLoading(true);

    try {
      for (const field of newFields) {
        const response = await createCustomFieldAPI({
  fieldKey: field.fieldKey,
  fieldLabel: field.fieldLabel,
  fieldType: "string",
  required: field.required,
});

        const result = response.data;

        if (!result.success) {
          toast.error(result.message || `Failed to save: ${field.fieldLabel}`);
          return;
        }
      }

      toast.success("Custom fields saved successfully!");
      setTimeout(() => onClose(), 1200);
    } catch (error) {
      console.error("Save custom fields error:", error);
      toast.error(getAxiosErrorMessage(error, "Server error. Try again."));
    } finally {
      setLoading(false);
    }
  };

  const newFieldsCount = fields.filter((field) => !field._id).length;

  return (
    <div className="h-screen w-full flex items-center justify-center bg-transparent">
      <div className="h-[80vh] max-w-[80%] w-[50%] min-w-[500px] rounded-3xl mx-auto relative flex flex-col bg-[#E9EBF7] overflow-hidden pb-3">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg border border-[#5764B3]/50 cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-[#5764B3]"
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

        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Gradient />
        </div>
        <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 pointer-events-none">
          <Gradient />
        </div>

        <h1 className="text-center text-2xl font-semibold text-[#5863B2] mb-2 mt-10 shrink-0">
          Custom Employee Fields
        </h1>

        <p className="text-center text-sm text-[#999] mb-4 shrink-0">
          These fields will appear in the employee onboarding form
        </p>

        <div className="flex justify-center flex-1 overflow-hidden">
          <div className="scroll-area w-[90%] overflow-y-auto">
            <style>{`
              .scroll-area::-webkit-scrollbar { width: 6px; }
              .scroll-area::-webkit-scrollbar-track { background: transparent; }
              .scroll-area::-webkit-scrollbar-thumb { background: #5764B3; border-radius: 12px; }
              .scroll-area { scrollbar-width: thin; scrollbar-color: #5764B3 transparent; }
            `}</style>

            <div className="flex flex-col space-y-3 py-2">
              {fetching ? (
                <div className="flex justify-center py-8">
                  <svg
                    className="animate-spin h-8 w-8 text-[#5764B3]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              ) : fields.length === 0 ? (
                <div className="text-center py-8 text-[#999]">
                  <p className="text-base">No custom fields yet.</p>
                  <p className="text-sm mt-1">
                    Click "Add New Field" to create one.
                  </p>
                </div>
              ) : (
                fields.map((field, index) => (
                  <div
                    key={index}
                    className="w-[90%] mx-auto bg-white rounded-xl p-4 border-2 border-[#5764B3]/30 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Field Name (e.g. Blood Group)"
                        value={field.fieldLabel}
                        onChange={(event) =>
                          handleChange(index, "fieldLabel", event.target.value)
                        }
                        disabled={loading || !!field._id}
                        className="flex-1 border-2 border-[#5764B3] rounded-xl p-3 outline-none bg-white text-[#5764B3] placeholder:text-[#5764B3]/50 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />

                      {!field._id ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          disabled={loading}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-200 transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                            />
                          </svg>
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-lg whitespace-nowrap">
                          ✅ Saved
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs text-[#999]">
                        Key:{" "}
                        <code className="bg-gray-100 px-1 rounded text-[#5764B3]">
                          {field.fieldKey || "auto_generated"}
                        </code>
                      </span>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-xs text-[#5764B3]">Required</span>

                        <div
                          onClick={() =>
                            !loading &&
                            !field._id &&
                            handleChange(index, "required", !field.required)
                          }
                          className={`w-10 h-5 rounded-full transition-all duration-200 relative ${
                            field._id
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer"
                          } ${
                            field.required ? "bg-[#5764B3]" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                              field.required ? "left-5" : "left-0.5"
                            }`}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                ))
              )}

              <button
                type="button"
                onClick={handleAddField}
                disabled={loading}
                className="w-[90%] mx-auto border-2 border-dashed border-[#5764B3]/50 rounded-xl p-3 text-[#5764B3] text-sm font-semibold hover:bg-[#5764B3]/5 transition-all flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Field
              </button>

              <div className="h-4" />
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full shrink-0">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading || newFieldsCount === 0}
            className={`mt-2 w-[250px] text-white text-xl font-bold p-3 rounded-xl shadow mb-4 transition-all duration-200 flex items-center justify-center gap-2 ${
              loading || newFieldsCount === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-b from-[#5764B3] to-[#252B4D] hover:opacity-90"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              `Save ${newFieldsCount} New Field${
                newFieldsCount !== 1 ? "s" : ""
              }`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetEmployeeFields;