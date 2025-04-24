import React, { useState } from "react";
import { useLoginMutation } from "../../services/authApi"; // Redux Toolkit Query for login API call
import { useNavigate } from "react-router-dom"; // For navigation after successful login
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { setUser } from "../../stateManagement/authuserState/userSlice"; // Action to store user info

const LoginForm = () => {
  // Redux Toolkit Query mutation hook to call the login endpoint
  const [login] = useLoginMutation();

  // Redux dispatch and React Router navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to store input values from user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Call the login API with user credentials
      const res = await login({ email, password }).unwrap();

      // Store JWT token in localStorage for redux persistence
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // If user information is ok , store it in Redux
      if (res.user) {
        dispatch(
          setUser({
            name: res.user.name,
            email: res.user.email,
            token: res.token,
            isAuthenticated: true,
          })
        );
      }

      // Redirect the user to the dashboard after successful login via navigate hook
      navigate("/dashboard");
    } catch (error) {
      // Show an error alert on failure
      alert("Login failed!");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Page title */}
        <h2 className="auth-title">Sign in to your account</h2>

        {/* Login form */}
        <form onSubmit={handleLogin} className="auth-form">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="auth-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        {/* Footer link to registration */}
        <p className="auth-footer">
          Don't have an account?{" "}
          <a href="/signup" className="auth-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
