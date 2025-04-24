import React, { useState } from "react";
import { useRegisterMutation } from "../../services/authApi"; // RTK Query hook for registration API
import { useNavigate } from "react-router-dom"; // Used to redirect after signup
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions
import { setUser } from "../../stateManagement/authuserState/userSlice"; // Action to store user in Redux

const SignupForm = () => {
  const [registerUser] = useRegisterMutation(); // RTK Query mutation hook
  const navigate = useNavigate(); // Router hook to navigate programmatically
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  // Local component state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Call register API and unwrap result from Redux toolkit query
      const res = await registerUser({ name, email, password }).unwrap();

      // If token exists, store in localStorage
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // Dispatch user details to Redux store
      if (res.user) {
        dispatch(
          setUser({
            name: res.user.name,
            email: res.user.email,
            token: res.token,
            isAuthenticated: true,
          })
        );
      } else {
        dispatch(
          setUser({
            name,
            email,
            token: res.token,
            isAuthenticated: true,
          })
        );
      }

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle error during signup
      alert("Signup failed!");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>

        {/* Signup form */}
        <form onSubmit={handleSignup} className="auth-form">
          {/* Name input */}
          <div>
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div>
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div>
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        {/* Redirect link to login */}
        <p className="auth-footer">
          Already have an account?{" "}
          <a href="/login" className="auth-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
