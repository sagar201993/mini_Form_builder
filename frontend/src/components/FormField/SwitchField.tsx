import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { SwitchFieldProps } from "../../types/formTypes";

const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  register,
  showLabels,
  validation,
  errorMessage,
}) => (
  <FormFieldWrapper label={label} showLabels={showLabels}>
    <label className="switch-label">
      <input
        type="checkbox"
        {...register(name, validation?.[name])}
        className="switch-input peer"
      />
      <div className="switch-style peer-checked:bg-green-500 peer-checked:after:translate-x-full"></div>
    </label>
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </FormFieldWrapper>
);

export default SwitchField;
