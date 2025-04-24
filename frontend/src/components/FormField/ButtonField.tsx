import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { ButtonFieldProps } from "../../types/formTypes";

const ButtonField: React.FC<ButtonFieldProps> = ({ label, showLabels }) => (
  <FormFieldWrapper label={label} showLabels={showLabels}>
    <button type="button" className="button-basic">
      {label}
    </button>
  </FormFieldWrapper>
);

export default ButtonField;
