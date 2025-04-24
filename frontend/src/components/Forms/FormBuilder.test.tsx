// src/components/FormBuilder.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../../stateManagement/formState/formSlice";
import FormBuilder from "./FormBuilder";

// Mock react-hook-form props
const mockRegister = jest.fn();
const mockErrors = {};

// 🧪 Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("FormBuilder", () => {
  const renderWithStore = (preloadedState = {}) => {
    const store = configureStore({
      reducer: {
        form: formReducer,
      },
      preloadedState: {
        form: {
          backgroundColor: "bg-white",
          fontFamily: "sans",
          showLabels: true,
          language: "en",
          fields: [],
          ...preloadedState,
        },
      },
    });

    render(
      <Provider store={store}>
        <FormBuilder register={mockRegister} errors={mockErrors} />
      </Provider>
    );

    return store;
  };

  it("renders the form builder title", () => {
    renderWithStore();
    expect(screen.getByText("untitledForm")).toBeInTheDocument();
  });

  it("adds a new field when a type is selected", () => {
    const store = renderWithStore();

    // Click + Add New Field
    const addButton = screen.getByText("+ addNewField");
    fireEvent.click(addButton);

    // Type "text" in search
    const searchInput = screen.getByPlaceholderText("search");
    fireEvent.change(searchInput, { target: { value: "text" } });

    // Click the "textField" option
    const textOption = screen.getByText("textField");
    fireEvent.click(textOption);

    // Expect the Redux store to now have a field
    const state = store.getState();
    expect(state.form.fields.length).toBe(1);
    expect(state.form.fields[0].type).toBe("text");
  });
});
