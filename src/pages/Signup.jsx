import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating your account..." });

    try {
      await signup(formData);
      setStatus({
        type: "success",
        message: "Account created! Redirecting...",
      });
      navigate("/dashboard", { replace: true });
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
        <h1>Create your CritiCore account</h1>
        <p className="card__muted">
          Upload books, store insights, and collaborate with your team.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Critique"
            />
          </label>

          <label>
            Email
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
            {status.type === "loading" ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {status.message && (
          <p className={`status status--${status.type}`}>{status.message}</p>
        )}

        <p className="card__muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
