// src/utils/buildValidationSchema.ts
import * as yup from "yup";
import { FormField } from "../types/formTypes";

export const buildValidationSchema = (fields: FormField[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    switch (field.type) {
      case "text":
        shape[field.name] = yup
          .string()

          .min(3, "Minimum length is 3 characters")
          .max(100, "Maximum length is 100 characters");
        break;

      case "dropdown":
      case "radio":
        shape[field.name] = yup.string().required("Please select an option");
        break;

      case "checkbox":
      case "switch":
        shape[field.name] = yup.boolean().oneOf([true], "This must be checked");
        break;

      case "button":
        // No validation needed
        break;

      default:
        shape[field.name] = yup.mixed();
    }
  });

  return yup.object().shape(shape);
};
