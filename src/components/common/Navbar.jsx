import React from "react";
import { useAuth } from "../auth/AuthProvider";

const Navbar = () => {
  const { user, role, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a className="navbar-brand" href="/">
        <div class="marca">
          <img src="/logo.png" width="40" alt="Logo" />
        <h2 class="titulo">Heladería Dulcinea</h2>
        </div>
      </a>
      <div className="ms-auto">
        {user ? (
          <>
            <span className="me-3">{user.email} ({role})</span>
            <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
          </>
        ) : (
          <a className="btn btn-outline-primary" href="/login">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
