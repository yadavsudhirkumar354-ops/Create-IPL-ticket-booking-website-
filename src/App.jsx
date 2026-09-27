import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

// Mock IPL 2026 Fixture Data
const INITIAL_MATCHES = [
  {
    id: 1,
    matchNo: "Match 01",
    category: "Season Opener 🔥",
    cityKey: "chennai",
    teamA: {
      name: "Chennai Super Kings",
      shortName: "CSK",
      logo: "🦁",
      color: "#F9CD05",
    },
    teamB: {
      name: "Mumbai Indians",
      shortName: "MI",
      logo: "⚡",
      color: "#004BA0",
    },
    date: "March 28, 2026",
    time: "7:30 PM IST",
    venue: "MA Chidambaram Stadium, Chennai",
    price: 1500,
    availableSeats: 340,
  },
  {
    id: 2,
    matchNo: "Match 02",
    category: "High Voltage Derby ⚡",
    cityKey: "bengaluru",
    teamA: {
      name: "Royal Challengers Bengaluru",
      shortName: "RCB",
      logo: "🔴",
      color: "#D71920",
    },
    teamB: {
      name: "Kolkata Knight Riders",
      shortName: "KKR",
      logo: "⚔️",
      color: "#3A225D",
    },
    date: "March 29, 2026",
    time: "7:30 PM IST",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    price: 1800,
    availableSeats: 195,
  },
  {
    id: 3,
    matchNo: "Match 03",
    category: "Champions Clash 🏆",
    cityKey: "ahmedabad",
    teamA: {
      name: "Gujarat Titans",
      shortName: "GT",
      logo: "⚡",
      color: "#1B2133",
    },
    teamB: {
      name: "Rajasthan Royals",
      shortName: "RR",
      logo: "👑",
      color: "#EA1A85",
    },
    date: "April 02, 2026",
    time: "7:30 PM IST",
    venue: "Narendra Modi Stadium, Ahmedabad",
    price: 1000,
    availableSeats: 520,
  },
  {
    id: 4,
    matchNo: "Match 04",
    category: "Powerplay Showdown 💥",
    cityKey: "mumbai",
    teamA: {
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logo: "🦅",
      color: "#F26522",
    },
    teamB: {
      name: "Delhi Capitals",
      shortName: "DC",
      logo: "🐯",
      color: "#0078BC",
    },
    date: "April 05, 2026",
    time: "3:30 PM IST",
    venue: "Rajiv Gandhi Intl Stadium, Hyderabad",
    price: 1200,
    availableSeats: 260,
  },
  {
    id: 5,
    matchNo: "Match 05",
    category: "Blockbuster Rivalry 🔥",
    cityKey: "mumbai",
    teamA: {
      name: "Mumbai Indians",
      shortName: "MI",
      logo: "⚡",
      color: "#004BA0",
    },
    teamB: {
      name: "Royal Challengers Bengaluru",
      shortName: "RCB",
      logo: "🔴",
      color: "#D71920",
    },
    date: "April 08, 2026",
    time: "7:30 PM IST",
    venue: "Wankhede Stadium, Mumbai",
    price: 2000,
    availableSeats: 88,
  },
  {
    id: 6,
    matchNo: "Match 06",
    category: "Eden Gardens Classic 🏟️",
    cityKey: "kolkata",
    teamA: {
      name: "Kolkata Knight Riders",
      shortName: "KKR",
      logo: "⚔️",
      color: "#3A225D",
    },
    teamB: {
      name: "Chennai Super Kings",
      shortName: "CSK",
      logo: "🦁",
      color: "#F9CD05",
    },
    date: "April 12, 2026",
    time: "7:30 PM IST",
    venue: "Eden Gardens, Kolkata",
    price: 1600,
    availableSeats: 310,
  },
];

function App() {
  // State 1: Mock IPL Matches list
  const [matches] = useState(INITIAL_MATCHES);

  // State 2: Active / latest booked match object
  const [selectedMatch, setSelectedMatch] = useState(null);

  // State 3: Toast notification banner
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bookingId: "",
  });

  // State 4: User's total booked tickets list for "My Bookings"
  const [bookedMatches, setBookedMatches] = useState([]);

  // State 5: Search and filter controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // State 6: My Bookings Modal Drawer
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  // Auto-dismiss confirmation toast after 6 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Handler for booking a match
  const handleBookNow = (match) => {
    const bookingCode = `IPL26-${Math.floor(1000 + Math.random() * 9000)}`;
    const standOptions = ["North Stand Upper", "Grand Terrace", "Pavilion Club", "East Stand"];
    const randomStand = standOptions[Math.floor(Math.random() * standOptions.length)];
    const randomSeat = `Row ${String.fromCharCode(65 + Math.floor(Math.random() * 10))}-${Math.floor(1 + Math.random() * 30)}`;

    const newBooking = {
      bookingId: bookingCode,
      match: match,
      stand: randomStand,
      seat: randomSeat,
      bookedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Update state with newly booked match
    setSelectedMatch(match);
    setBookedMatches((prev) => [newBooking, ...prev]);

    // Trigger confirmation toast & banner
    setToast({
      show: true,
      message: `Ticket confirmed for ${match.teamA.shortName} vs ${match.teamB.shortName}!`,
      bookingId: bookingCode,
    });
  };

  // Filter matches based on search query & selected category
  const filteredMatches = matches.filter((match) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      match.teamA.name.toLowerCase().includes(query) ||
      match.teamA.shortName.toLowerCase().includes(query) ||
      match.teamB.name.toLowerCase().includes(query) ||
      match.teamB.shortName.toLowerCase().includes(query) ||
      match.venue.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (selectedFilter === "all") return true;
    if (selectedFilter === "rivalry") {
      return match.category.toLowerCase().includes("rivalry") || match.category.toLowerCase().includes("voltage");
    }
    return match.cityKey === selectedFilter;
  });

  return (
    <div className="app-container">
      {/* 1. Header Navigation */}
      <Navbar
        bookedCount={bookedMatches.length}
        onOpenBookings={() => setShowBookingsModal(true)}
        onNavigate={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {/* 3. Real-time Booking Confirmation Banner (Active State) */}
      {selectedMatch && toast.show && (
        <section className="booking-confirmation-banner" aria-live="polite">
          <div className="banner-content">
            <div className="banner-icon-badge">🎉</div>
            <div className="banner-details">
              <span className="banner-tag">BOOKING CONFIRMED • ID: {toast.bookingId}</span>
              <h3 className="banner-match-title">
                {selectedMatch.teamA.name} vs {selectedMatch.teamB.name}
              </h3>
              <p className="banner-meta">
                <span>📍 {selectedMatch.venue}</span>
                <span>📅 {selectedMatch.date} ({selectedMatch.time})</span>
                <span className="banner-price">Paid: ₹{selectedMatch.price.toLocaleString("en-IN")}</span>
              </p>
            </div>
            <div className="banner-actions">
              <button
                type="button"
                className="banner-view-btn"
                onClick={() => setShowBookingsModal(true)}
              >
                View E-Ticket
              </button>
              <button
                type="button"
                className="banner-close-btn"
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                aria-label="Dismiss confirmation banner"
              >
                ✕
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Match Fixtures Section */}
      <main id="matches" className="matches-section">
        <div className="matches-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">2026 OFFICIAL SCHEDULE</span>
            <h2 className="section-title">Upcoming IPL Matches</h2>
            <p className="section-description">
              Select your fixture below to reserve official match tickets. All bookings include verified digital stadium entry.
            </p>
          </div>

          <div className="matches-status-pill">
            Showing <strong>{filteredMatches.length}</strong> of {matches.length} matches
          </div>
        </div>

        {/* Dynamic Grid of Match Cards */}
        {filteredMatches.length > 0 ? (
          <div className="matches-grid">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onBook={handleBookNow}
                isBooked={bookedMatches.some((b) => b.match.id === match.id)}
              />
            ))}
          </div>
        ) : (
          <div className="no-matches-found">
            <span className="empty-icon">🏏</span>
            <h3>No Fixtures Found</h3>
            <p>We couldn't find any matches matching "{searchQuery}". Try searching for another team or venue.</p>
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* 5. Floating Toast Notification */}
      {toast.show && (
        <aside className="toast-notification" role="status">
          <div className="toast-glow-border"></div>
          <div className="toast-body">
            <span className="toast-check">✓</span>
            <div className="toast-text">
              <strong>{toast.message}</strong>
              <small>ID: {toast.bookingId} • Added to My Bookings</small>
            </div>
            <button
              type="button"
              className="toast-dismiss"
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
          <div className="toast-progress-bar"></div>
        </aside>
      )}

      {/* 6. "My Bookings" Slide-over / Modal */}
      {showBookingsModal && (
        <div className="modal-backdrop" onClick={() => setShowBookingsModal(false)}>
          <div
            className="bookings-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bookings-modal-title"
          >
            <div className="modal-header">
              <div>
                <h3 id="bookings-modal-title">My Booked Tickets</h3>
                <p>Digital Stadium Entry Passes ({bookedMatches.length})</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowBookingsModal(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {bookedMatches.length === 0 ? (
                <div className="empty-bookings-box">
                  <span className="empty-ticket-icon">🎟️</span>
                  <h4>No Active Bookings Yet</h4>
                  <p>Browse upcoming matches and click "Book Now" to reserve your stadium seats!</p>
                  <button
                    type="button"
                    className="browse-matches-btn"
                    onClick={() => {
                      setShowBookingsModal(false);
                      const el = document.getElementById("matches");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Browse Matches
                  </button>
                </div>
              ) : (
                <div className="tickets-list">
                  {bookedMatches.map((item, idx) => (
                    <div key={`${item.bookingId}-${idx}`} className="digital-ticket-card">
                      <div className="ticket-header">
                        <span className="ticket-id">{item.bookingId}</span>
                        <span className="ticket-status-badge">CONFIRMED</span>
                      </div>
                      <div className="ticket-teams">
                        <strong>{item.match.teamA.shortName} vs {item.match.teamB.shortName}</strong>
                        <span>{item.match.teamA.name} vs {item.match.teamB.name}</span>
                      </div>
                      <div className="ticket-info-grid">
                        <div>
                          <small>Date & Time</small>
                          <p>{item.match.date} • {item.match.time}</p>
                        </div>
                        <div>
                          <small>Venue</small>
                          <p>{item.match.venue}</p>
                        </div>
                        <div>
                          <small>Stand & Seat</small>
                          <p className="seat-highlight">{item.stand} • {item.seat}</p>
                        </div>
                        <div>
                          <small>Amount Paid</small>
                          <p className="price-highlight">₹{item.match.price.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                      <div className="ticket-barcode-mock">
                        <div className="barcode-lines"></div>
                        <span>SCAN AT STADIUM TURNSTILE</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🏆 IPL Tickets 2026</span>
            <p>Official ticketing partner for TATA Indian Premier League 2026.</p>
          </div>
          <div className="footer-copyright">
            <p>© 2026 BCCI / IPL. Built with React + Vite.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
