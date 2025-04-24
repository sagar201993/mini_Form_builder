import React from "react";
import { TextFieldProps } from "../../types/formTypes";

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  register,
  placeholder,
  showLabels,
  value,
  validation,
  errorMessage,
}) => (
  <div className="textfield-wrapper">
    {showLabels && <label className="textfield-label">{label}</label>}
    <input
      type="text"
      {...register(name, validation?.[name])}
      defaultValue={value}
      placeholder={placeholder}
      className="textfield-input"
    />
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </div>
);

export default TextField;
