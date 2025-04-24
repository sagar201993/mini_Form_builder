import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { DropdownFieldProps } from "../../types/formTypes";

const DropdownField: React.FC<DropdownFieldProps> = ({
  name,
  label,
  register,
  showLabels,
  validation,
  errorMessage,
}) => (
  <FormFieldWrapper label={label} showLabels={showLabels}>
    <select {...register(name, validation?.[name])} className="dropdown-select">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </FormFieldWrapper>
);

export default DropdownField;
