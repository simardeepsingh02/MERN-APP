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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand text-dark font-weight-bolder" style={{ fontFamily: 'Poppins, sans-serif' }} href="#">◥꧁ད 𝙽𝚄𝙼𝙴𝚁𝙾𝚉𝙸𝙽 ཌ꧂◤</a>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {!loggedUserId && (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark">Login</Link> {/* Add text-dark class here */}
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link text-dark">Register</Link> {/* Add text-dark class here */}
            </li>
          </>
        )}
        {loggedUserId && (
          <>
            <li className="nav-item">
              <Link to="/read" className="nav-link text-dark">All Users</Link> {/* Add text-dark class here */}
            </li>
            <li className="nav-item">
              <Link to="/myslots" className="nav-link text-dark">My Slots</Link> {/* Add text-dark class here */}
            </li>
            <li className="nav-item">
              <Link to="/slots-aval" className="nav-link text-dark">Available Slots</Link> {/* Add text-dark class here */}
            </li>
            <li className="nav-item">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-danger text-dark" type="submit">Search</button> {/* Add btn-danger class for a red button */}
              </form>
            </li>

          </>
        )}
      </ul>
      <form className="d-flex" role="search">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {loggedUserId && (
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Welcome {loggedUserName}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item text-dark" to="/" onClick={handleLogout}>Logout</Link></li>
              {/* You can add more dropdown items if needed */}
            </ul>
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
