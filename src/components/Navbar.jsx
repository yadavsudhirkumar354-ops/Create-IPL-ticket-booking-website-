import React from "react";

function Navbar({ bookedCount = 0, onOpenBookings, onNavigate }) {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="navbar-container">
      <nav className="navbar" aria-label="Main Navigation">
        {/* Brand Logo & Title */}
        <a href="#home" className="nav-brand" onClick={(e) => handleLinkClick(e, "home")}>
          <div className="brand-logo-icon">
            <span role="img" aria-label="cricket trophy">🏆</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">IPL Tickets 2026</span>
            <span className="brand-badge">OFFICIAL PORTAL</span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="nav-links">
          <a
            href="#home"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, "home")}
          >
            Home
          </a>
          <a
            href="#matches"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, "matches")}
          >
            Matches
          </a>
          <button
            type="button"
            className="nav-link nav-bookings-btn"
            onClick={onOpenBookings}
            aria-label="View My Bookings"
          >
            <span>My Bookings</span>
            {bookedCount > 0 && (
              <span className="bookings-pill" title={`${bookedCount} ticket(s) booked`}>
                {bookedCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
