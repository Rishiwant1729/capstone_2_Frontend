import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const Upload = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    pdf: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Uploading book..." });

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          payload.append(key, value);
        }
      });

      await axios.post("/books", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ type: "success", message: "Book uploaded!" });
      navigate("/dashboard");
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
        <h1>Upload a PDF</h1>
        <p className="card__muted">
          CritiCore extracts the text and drafts an outline automatically.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Book title *
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Author
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Optional context or objectives for the summary"
            />
          </label>

          <label>
            PDF file *
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              required
              onChange={handleChange}
            />
          </label>

          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Uploading..." : "Upload"}
          </button>
        </form>

        {status.message && (
          <p className={`status status--${status.type}`}>{status.message}</p>
        )}
      </div>
    </section>
  );
};

export default Upload;

