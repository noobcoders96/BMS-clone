import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/authApi";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          Book<span>My</span>Show
        </Link>
        <div className="nav-links">
          {user && <Link to="/bookings">My Bookings</Link>}
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button className="pill-btn-outline" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="pill-btn">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
