import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/Forms/LoginForm";
import SignupForm from "./components/Forms/SignUpForm";
import FormLayout from "./layouts/FormLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Component that redirects authenticated users away from login/signup
const RedirectIfAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Login route is only accessible if user is NOT logged in */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginForm />
            </RedirectIfAuth>
          }
        />

        {/* Signup route is only accessible if user is NOT logged in */}
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <SignupForm />
            </RedirectIfAuth>
          }
        />

        {/* Protected route — accessible only if user IS authenticated */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FormLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
