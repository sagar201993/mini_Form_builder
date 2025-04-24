// types.ts
import { UseFormRegister } from "react-hook-form";

export type FieldType =
  | "text"
  | "button"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "switch";

export interface FormField {
  type: FieldType;
  name: string;
  label: { [locale: string]: string };
  placeholder?: { [locale: string]: string };
  backgroundColor: string;
  value?: any;
  required?: boolean;
  options?: string[];
}

export interface ButtonFieldProps {
  label: string;
  showLabels: boolean;
}

export interface CheckboxFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  showLabels: boolean;
  validation?: Record<string, any>;
  errorMessage?: string;
}

export interface DropdownFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  showLabels: boolean;
  validation?: Record<string, any>;
  errorMessage?: string;
}

export interface FormFieldWrapperProps {
  label: string;
  children: React.ReactNode;
  showLabels: boolean;
}

export interface RadioButtonFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  showLabels: boolean;
  validation?: Record<string, any>;
  errorMessage?: string;
}

export interface SwitchFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  showLabels: boolean;
  validation?: Record<string, any>;
  errorMessage?: string;
}

export interface TextFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  showLabels: boolean;
  value?: any;
  validation?: Record<string, any>;
  errorMessage?: string;
}
