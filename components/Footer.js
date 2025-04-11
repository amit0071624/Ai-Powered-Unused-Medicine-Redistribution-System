import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import "../styles/theme.css";
import PaymentOffers from "./PaymentOffers";

function Footer() {
  return (
    <footer className="footer glass-effect">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="gradient-text">MediShare</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/">Our Services</Link></li>
            <li><Link to="/">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="gradient-text">Quick Links</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/selldonate">Sell/Donate</Link></li>
            <li><Link to="/order-checkout">Order Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="gradient-text">Connect With Us</h3>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">📱</a>
            <a href="#" aria-label="Twitter">💬</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>

      <div className="footer-section payment-section">
        <PaymentOffers />
      </div>

      <div className="footer-bottom">
        <p>© 2025 MediShare. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
