import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { RadioButtonFieldProps } from "../../types/formTypes";

const RadioButtonField: React.FC<RadioButtonFieldProps> = ({
  name,
  label,
  register,
  showLabels,
  validation,
  errorMessage,
}) => (
  <FormFieldWrapper label={label} showLabels={showLabels}>
    <div className="radio-group">
      <label className="radio-label">
        <input
          type="radio"
          value="option1"
          {...register(name, validation?.[name])}
          className="radio-input"
        />
        Option 1
      </label>
      <label className="radio-label">
        <input
          type="radio"
          value="option2"
          {...register(name, validation?.[name])}
          className="radio-input"
        />
        Option 2
      </label>
    </div>
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </FormFieldWrapper>
);

export default RadioButtonField;
