import React from "react";

function MatchCard({ match, onBook, isBooked = false }) {
  const {
    id,
    matchNo,
    teamA,
    teamB,
    date,
    time,
    venue,
    price,
    category,
    availableSeats,
  } = match;

  const handleBookClick = () => {
    if (onBook) {
      onBook(match);
    }
  };

  return (
    <article className={`match-card ${isBooked ? "card-booked" : ""}`} id={`match-card-${id}`}>
      {/* Top Card Badge: Match # & Category */}
      <div className="match-card-header">
        <span className="match-number-tag">{matchNo || `MATCH #${id}`}</span>
        {category && <span className="match-category-tag">{category}</span>}
      </div>

      {/* Teams Faceoff Section */}
      <div className="teams-duel-container">
        {/* Team A */}
        <div className="team-item team-a">
          <div
            className="team-crest"
            style={{
              borderColor: teamA.color || "#f59e0b",
              background: `radial-gradient(circle, ${teamA.color}22 0%, rgba(255,255,255,0.02) 80%)`,
            }}
          >
            <span className="team-emoji-icon">{teamA.logo || "🏏"}</span>
          </div>
          <span className="team-short-code">{teamA.shortName}</span>
          <span className="team-full-name">{teamA.name}</span>
        </div>

        {/* VS Indicator */}
        <div className="vs-badge-wrapper">
          <div className="vs-circle">VS</div>
          <span className="live-pulse-text">LIVE SOON</span>
        </div>

        {/* Team B */}
        <div className="team-item team-b">
          <div
            className="team-crest"
            style={{
              borderColor: teamB.color || "#38bdf8",
              background: `radial-gradient(circle, ${teamB.color}22 0%, rgba(255,255,255,0.02) 80%)`,
            }}
          >
            <span className="team-emoji-icon">{teamB.logo || "🏏"}</span>
          </div>
          <span className="team-short-code">{teamB.shortName}</span>
          <span className="team-full-name">{teamB.name}</span>
        </div>
      </div>

      {/* Match Meta Information: Date, Time, Venue */}
      <div className="match-meta-grid">
        <div className="meta-row">
          <span className="meta-icon" aria-hidden="true">📅</span>
          <span className="meta-text"><strong>{date}</strong></span>
        </div>
        <div className="meta-row">
          <span className="meta-icon" aria-hidden="true">⏰</span>
          <span className="meta-text">{time}</span>
        </div>
        <div className="meta-row meta-venue">
          <span className="meta-icon" aria-hidden="true">📍</span>
          <span className="meta-text" title={venue}>{venue}</span>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="match-card-footer">
        <div className="price-tag-wrapper">
          <span className="price-label">Tickets From</span>
          <span className="price-amount">₹{price.toLocaleString("en-IN")}</span>
          {availableSeats && (
            <span className="seats-tag">
              <span className="seat-dot"></span> {availableSeats} seats left
            </span>
          )}
        </div>

        <button
          type="button"
          className={`book-now-btn ${isBooked ? "booked" : ""}`}
          onClick={handleBookClick}
          aria-label={`Book ticket for ${teamA.shortName} vs ${teamB.shortName}`}
        >
          {isBooked ? "Book Again" : "Book Now"}
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

export default MatchCard;
