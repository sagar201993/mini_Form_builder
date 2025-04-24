// store/formSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField, FieldType } from "../../types/formTypes";

// Define the structure of the form builder state
interface FormState {
  backgroundColor: string;
  fontFamily: string;
  language: string;
  showLabels: boolean;
  fields: FormField[]; // Array of form fields (text, dropdown, etc.)
}

// Initial state for the form builder
const initialState: FormState = {
  backgroundColor: "bg-white",
  fontFamily: "Roboto",
  language: "en",
  showLabels: true,
  fields: [],
};

// Create the form slice with all necessary reducers
const formSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    // Set background color of the form
    setBackground(state, action: PayloadAction<string>) {
      state.backgroundColor = action.payload;
    },

    // Set font family used in the form
    setFont(state, action: PayloadAction<string>) {
      state.fontFamily = action.payload;
    },

    // Set the active language for labels/placeholders
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },

    // Toggle whether labels are shown on form fields
    toggleLabels(state) {
      state.showLabels = !state.showLabels;
    },

    // Add a new field to the form
    addField(state, action: PayloadAction<{ type: FieldType }>) {
      const newField: FormField = {
        type: action.payload.type,
        name: `field_${Date.now()}`, // Generates a unique field name (could also use UUID)
        label: { en: "Label" }, // Default label
        placeholder: {}, // Empty placeholder map
        backgroundColor: "bg-white",
        value: "", // Initial value
      };
      state.fields.push(newField);
    },

    // Update a field's label, placeholder, or value based on the current language
    updateField(
      state,
      action: PayloadAction<{
        index: number;
        label?: string;
        placeholder?: string;
        value?: any;
      }>
    ) {
      const field = state.fields[action.payload.index];
      if (!field) return;

      const lang = state.language;

      // Update localized label
      if (action.payload.label !== undefined) {
        field.label[lang] = action.payload.label;
      }

      // Update localized placeholder
      if (action.payload.placeholder !== undefined) {
        if (!field.placeholder) field.placeholder = {};
        field.placeholder[lang] = action.payload.placeholder;
      }

      // Update field value (for pre-fill, drafts, etc.)
      if (action.payload.value !== undefined) {
        field.value = action.payload.value;
      }
    },

    // Delete a field by index
    deleteField(state, action: PayloadAction<number>) {
      state.fields.splice(action.payload, 1);
    },

    // Replace the entire fields array (e.g., for importing saved form config)
    setFields(state, action: PayloadAction<FormField[]>) {
      state.fields = action.payload;
    },
  },
});

// Export all action creators
export const {
  setBackground,
  setFont,
  setLanguage,
  toggleLabels,
  addField,
  updateField,
  deleteField,
  setFields,
} = formSlice.actions;

// Export the reducer to be included in the Redux store
export default formSlice.reducer;
