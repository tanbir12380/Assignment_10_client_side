import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <img src="/logo.png" alt="Bill Hub Logo" className="footer-logo" />
          <p className="footer-description">
            The BillHub is a MERN Stack-based web application that allows users
            to view, and manage monthly utility bills such as Electricity, Gas,
            Water, and Internet etc. Users can securely log in, pay only current
            month bills and also update their bills. The system also features
            responsive UI, search/display functionalities, and a PDF report
            download for a user's paid bill history.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/bills">All Bills</NavLink>
            </li>
            <li>
              <a>Pay Bills</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <PiXLogoBold />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bill Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
