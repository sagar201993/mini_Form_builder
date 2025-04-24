import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../stateManagement/store";
import {
  setBackground,
  toggleLabels,
  setFont,
  setLanguage,
} from "../../stateManagement/formState/formSlice";
import { useTranslation } from "react-i18next";
import { UseFormGetValues } from "react-hook-form";
import colors from "../../constants/formContants";
import { fonts } from "../../constants/formContants";
import { usePublishFormMutation } from "../../services/publishFormApi";
import { FormField } from "../../types/formTypes";

interface Props {
  getValues?: UseFormGetValues<any>; // Optional: hook to fetch form values from parent
}

const SettingsPanel: React.FC<Props> = ({ getValues }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get form-related state from Redux
  const formState = useSelector((state: RootState) => state.form);
  const { backgroundColor, showLabels, fontFamily, language, fields } =
    formState;

  const { t: rawT, i18n } = useTranslation();
  const t = rawT as (key: string) => string;

  // Redux tookit query mutation hook for publishing
  const [publishFormMutation, { isLoading }] = usePublishFormMutation();

  const [isPublishDisabled, setIsPublishDisabled] = useState(true); // Track publish button enable state

  // Automatically determine if the form is publishable
  useEffect(() => {
    if (!getValues) return;

    const interval = setInterval(() => {
      const fieldValues = getValues();

      const hasAtLeastOneValue = fields.some((field) => {
        const value = fieldValues[field.name];
        return value && value.toString().trim() !== "";
      });

      const hasFields = fields.length > 0;

      // Disable publish if no fields or no values
      setIsPublishDisabled(!hasFields || !hasAtLeastOneValue);
    }, 300); // Poll form state every 300ms

    return () => clearInterval(interval);
  }, [fields, getValues]);

  // Handle publishing the form
  const handlePublish = async () => {
    const fieldValues = getValues ? getValues() : {};

    // Prepare form data with safe deep copies for labels/placeholders
    const cleanedFields = fields.map((field: FormField) => ({
      ...field,
      label: JSON.parse(JSON.stringify(field.label)),
      placeholder: field.placeholder
        ? JSON.parse(JSON.stringify(field.placeholder))
        : {},
      value: fieldValues[field.name] || "",
    }));

    const hasAtLeastOneValue = cleanedFields.some((field) => {
      const value = fieldValues[field.name];
      return value && value.toString().trim() !== "";
    });

    // Prevent empty form submission
    if (cleanedFields.length === 0 || !hasAtLeastOneValue) {
      alert("🚫 Cannot submit. Please fill out at least one field.");
      return;
    }

    // Construct full form data payload
    const formData = {
      title: "My Form",
      backgroundColor,
      showLabels,
      fontFamily,
      language,
      fields: cleanedFields,
    };

    try {
      await publishFormMutation(formData).unwrap();
      alert(" Form published successfully!");
    } catch (error) {
      console.error("Error publishing form:", error);
      alert(" Form submission failed.");
    }
  };

  return (
    <div className="relative settings-panel">
      {/* Top-right Publish Button */}
      <div className="absolute -top-24 right-0">
        <button
          type="button"
          onClick={handlePublish}
          disabled={isLoading || isPublishDisabled}
          className={`px-5 py-2 rounded-md text-white font-medium shadow-sm transition-all ${
            isLoading || isPublishDisabled
              ? "bg-blue-600 opacity-50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading
            ? t("publishing")
            : isPublishDisabled
            ? t("Fill Required Fields")
            : t("publishForm")}
        </button>
      </div>

      {/* Language Selection */}
      <div>
        <p className="settings-group-label">{t("language")}</p>
        <select
          value={language}
          onChange={(e) => {
            const lng = e.target.value;
            i18n.changeLanguage(lng); // Change i18n context language
            dispatch(setLanguage(lng)); // Update Redux language state
          }}
          className="settings-select"
        >
          <option value="en">🇺🇸 {t("english")}</option>
          <option value="de">🇩🇪 {t("german")}</option>
        </select>
      </div>

      {/* Background Color Options */}
      <div>
        <p className="settings-group-label">{t("backgroundColour")}</p>
        <div className="settings-color-options">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => dispatch(setBackground(c))}
              className={`settings-color-button ${c} ${
                backgroundColor === c ? "border-black" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div>
        <p className="settings-group-label">{t("fontFamily")}</p>
        <select
          value={fontFamily}
          onChange={(e) => dispatch(setFont(e.target.value))}
          className="settings-font-option"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle for Showing Field Labels */}
      <div className="flex items-center justify-between">
        <label htmlFor="formLabelsToggle" className="text-sm font-medium">
          {t("formLabels")}
        </label>
        <label className="settings-toggle-label" htmlFor="formLabelsToggle">
          <input
            id="formLabelsToggle"
            type="checkbox"
            checked={showLabels}
            onChange={() => dispatch(toggleLabels())}
            className="settings-toggle-input peer"
          />
          <div className="settings-toggle-track peer-checked:bg-green-500">
            <div
              className={`settings-toggle-thumb ${
                showLabels ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
