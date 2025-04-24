import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { CheckboxFieldProps } from "../../types/formTypes";

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  register,
  showLabels,
  validation,
  errorMessage,
}) => (
  <FormFieldWrapper label={label} showLabels={showLabels}>
    <label className="checkbox-label">
      <input
        type="checkbox"
        {...register(name, validation?.[name])}
        className="checkbox-input"
      />
      {label}
    </label>
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </FormFieldWrapper>
);

export default CheckboxField;
