import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
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
      await login(formData);
      setStatus({ type: "success", message: "Welcome back!" });
      const redirectTo = location.state?.from?.pathname ?? "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || error.message,
      });
    }
  };

  return (
    <section className="page">
      <div className="form-card">
        <h1>Sign in to CritiCore</h1>
        <p className="card__muted">
          Access your library and keep summaries in sync across devices.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              minLength={6}
            />
          </label>

          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Signing in..." : "Login"}
          </button>
        </form>

        {status.message && (
          <p className={`status status--${status.type}`}>{status.message}</p>
        )}

        <p className="card__muted">
          New to CritiCore? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
