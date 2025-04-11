import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/theme.css";
import logo from "../assets/new-logo.svg";
import { FaSearch, FaShoppingCart, FaUser, FaMoon, FaSun, FaChevronDown, FaTruck, FaSignOutAlt, FaUserEdit, FaBell } from "react-icons/fa";
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';




const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { notifications, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const categories = [
    "Medicines",
    "Wellness",
    "Lab Tests",
    "Beauty",
    "Health Corner",
    "COVID-19"
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand-link">
          <span className="brand-text">MediShare</span>
        </Link>
        <div className="categories-dropdown">
          <button className="categories-btn" onClick={() => setShowCategories(!showCategories)}>
            <span className="btn-text">Explore Health Solutions</span> <FaChevronDown />
          </button>
          {showCategories && (
            <div className="categories-menu">
              {categories.map((category, index) => (
                <Link key={index} to={`/category/${category.toLowerCase()}`}>{category}</Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-center">
        <form onSubmit={handleSearch} className="search-form glass-effect">
          <input
            type="text"
            placeholder="Find medicines, wellness products, or ways to help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FaSearch />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      <div className="navbar-right">
        <div className="notifications-dropdown">
          <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <FaBell />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div className="notifications-menu">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    {notification.details && (
                      <div className="notification-details">
                        <div>Contact: {notification.details.contact}</div>
                        <div>Request Type: {notification.details.requestType}</div>
                      </div>
                    )}
                    <div className="notification-time">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-notifications">No notifications</div>
              )}
            </div>
          )}
        </div>
        <Link to="/upload-prescription" className="upload-btn">
          Upload
        </Link>
        {user ? (
          <div className="user-profile">
            <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
              <FaUser />
              <span>{user.email}</span>
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                  <FaUserEdit /> Edit Profile
                </Link>
                <button onClick={() => {
                  setShowUserMenu(false);
                  logout();
                }}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="user-account">
            <FaUser />
            <span>Sign in / Sign up</span>
          </Link>
        )}
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
