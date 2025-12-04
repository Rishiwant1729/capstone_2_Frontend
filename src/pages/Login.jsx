import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Signing you in..." });

    try {
      const response = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to sign in");
      }

      localStorage.setItem("token", result.token);
      setStatus({ type: "success", message: "Welcome back!" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-heading">CritiCore</h1>
      <div className="auth-card">

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </label>

          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Signing in..." : "Login"}
          </button>
        </form>

        {status.message && (
          <p className={`status-message ${status.type}`}>
            {status.message}
          </p>
        )}

        <p className="auth-switch">
          New to the community? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
