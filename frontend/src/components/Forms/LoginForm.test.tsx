// src/components/Forms/LoginForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../stateManagement/authuserState/userSlice";

// 🧪 Mocks
const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../services/authApi", () => ({
  useLoginMutation: () => [mockLogin],
}));

describe("LoginForm", () => {
  const store = configureStore({
    reducer: {
      authuser: userReducer,
    },
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    window.alert = jest.fn(); // Prevent jsdom alert errors
  });

  it("logs in successfully and navigates to dashboard", async () => {
    // ✅ Properly mock login().unwrap()
    mockLogin.mockReturnValue(
      Promise.resolve({
        unwrap: () =>
          Promise.resolve({
            token: "mock-token",
            user: {
              name: "Test User",
              email: "test@example.com",
            },
          }),
      })
    );

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("mock-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
  });

  it("shows alert on failed login attempt", async () => {
    // ✅ Mock failed unwrap
    mockLogin.mockReturnValue(
      Promise.resolve({
        unwrap: () => Promise.reject("Login failed"),
      })
    );

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "fail@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login failed!");
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
