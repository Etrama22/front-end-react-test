// src/components/Navbar.js
import React from "react";
import Logo from "../assets/NavbarLogo.png";

const Navbar = () => {
  return (
    <nav className="navbar shadow-sm navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand me-auto" href="##">
          <img src={Logo} alt="" />
        </a>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img src={Logo} alt="" />
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link mx-lg-2"
                  aria-current="page"
                  href="/"
                  data-section=""
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="##" data-section="">
                  Talenta
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="##" data-section="">
                  Klien
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="##" data-section="">
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="##" data-section="">
                  mentor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="##" data-section="">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a href="/login" className="login-button">
          Sign Up
        </a>
        <button
          className="navbar-toggler pe-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
