/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedUserId = sessionStorage.getItem('userId');
  const loggedUserName = sessionStorage.getItem('userName');

  const handleLogout = () => {
    // Handle logout logic, clear session storage, and navigate to the home page
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">NUMEROZIN</a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!loggedUserId && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">Register</Link>
                </li>
              </>
            )}
            {loggedUserId && (
              <>
                <li className="nav-item">
                  <Link to="/read" className="nav-link">All Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link zoom" to="">
                    Welcome {loggedUserName}
                  </Link>
                </li>
                <li className="nav-item">
                  <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                  </form>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loggedUserId && (
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
            {/* Add your search input and button here */}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
