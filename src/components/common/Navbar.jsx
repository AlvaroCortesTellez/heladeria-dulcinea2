// src/components/common/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Heladería Dulcinea" width="50" className="me-2" />
          Heladería Dulcinea
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    {user.email} ({user.role || "Cliente"})
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-secondary" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
