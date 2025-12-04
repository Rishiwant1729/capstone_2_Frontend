import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setUser(data.user);
      setError("");
    } catch (err) {
      setError(err.message);
      if (err.message.includes("token")) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="header-section">
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
          </div>

          <h1>User Profile</h1>

          <div className="profile-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{user?.name || "Not provided"}</span>
            </div>

            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>

            <div className="info-row">
              <span className="label">Member Since:</span>
              <span className="value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>

            <div className="info-row">
              <span className="label">User ID:</span>
              <span className="value">#{user?.id}</span>
            </div>
          </div>

          <div className="actions">
            <Link to="/dashboard" className="btn btn-primary">
              My Dashboard
            </Link>
            <Link to="/upload" className="btn btn-secondary">
              Upload Book
            </Link>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .profile-container {
          width: 100%;
          max-width: 600px;
        }
        .header-section {
          margin-bottom: 1rem;
        }
        .back-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          display: inline-block;
        }
        .back-link:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .profile-card {
          background: white;
          border-radius: 16px;
          padding: 3rem 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-weight: bold;
        }
        .profile-card h1 {
          margin: 0 0 2rem 0;
          color: #2c3e50;
        }
        .profile-info {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #7f8c8d;
        }
        .value {
          color: #2c3e50;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .btn {
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
        }
        .btn-primary {
          background: #3498db;
          color: white;
        }
        .btn-primary:hover {
          background: #2980b9;
        }
        .btn-secondary {
          background: #2ecc71;
          color: white;
        }
        .btn-secondary:hover {
          background: #27ae60;
        }
        .btn-logout {
          background: #e74c3c;
          color: white;
        }
        .btn-logout:hover {
          background: #c0392b;
        }
        .loading,
        .error {
          color: white;
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default Profile;
