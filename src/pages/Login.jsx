import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
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
      const result = await login(formData);
      localStorage.setItem("token", result.token);
      setStatus({ type: "success", message: "Welcome back!" });
      setTimeout(() => navigate("/dashboard"), 500);
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
