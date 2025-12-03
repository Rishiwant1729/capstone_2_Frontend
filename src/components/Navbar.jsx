import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__section">
        <img src={logo} alt="CritiCore logo" className="navbar__logo" />
        <Link to="/" className="navbar__brand">
          CritiCore
        </Link>
      </div>

      <nav className="navbar__section">
        <NavLink to="/" className="navbar__link">
          Home
        </NavLink>
        <NavLink to="/dashboard" className="navbar__link">
          Dashboard
        </NavLink>
        <NavLink to="/upload" className="navbar__button">
          Upload Book
        </NavLink>
      </nav>

      <div className="navbar__section">
        {user ? (
          <>
            <span className="navbar__user">{user.name || user.email}</span>
            <button type="button" className="navbar__link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar__link">
              Login
            </NavLink>
            <NavLink to="/signup" className="navbar__button--outline">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

