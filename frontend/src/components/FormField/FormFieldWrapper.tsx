import React from "react";
import { FormFieldWrapperProps } from "../../types/formTypes";

const FormFieldWrapper = ({
  label,
  children,
  showLabels,
}: FormFieldWrapperProps) => {
  return (
    <div className="field-wrapper-container">
      {showLabels && <label className="field-wrapper-label">{label}</label>}
      {children}
    </div>
  );
};

export default FormFieldWrapper;
