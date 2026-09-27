import React from "react";

function Hero({ searchQuery = "", setSearchQuery, selectedFilter = "all", setSelectedFilter }) {
  const filterOptions = [
    { id: "all", label: "All Fixtures" },
    { id: "chennai", label: "Chennai" },
    { id: "mumbai", label: "Mumbai" },
    { id: "bengaluru", label: "Bengaluru" },
    { id: "ahmedabad", label: "Ahmedabad" },
    { id: "rivalry", label: "High Voltage 🔥" },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-backdrop-glow"></div>

      <div className="hero-content">
        <div className="hero-pill-tag">
          <span className="live-dot"></span>
          <span>TATA IPL 2026 SEASON TICKETS LIVE NOW</span>
        </div>

        <h1 className="hero-title">
          Feel The Roar. <br />
          <span className="gradient-text">Live The Passion.</span>
        </h1>

        <p className="hero-subtitle">
          Experience stadium energy live from the best stands in world cricket.
          Secure 100% verified official tickets with instant confirmation and contactless digital stadium passes.
        </p>

        {/* Search & Filter Component */}
        <div className="hero-search-box">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              id="match-search-input"
              type="text"
              placeholder="Search by team (e.g. CSK, MI, RCB) or stadium venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="hero-search-input"
              aria-label="Search matches by team or venue"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery && setSearchQuery("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          {setSelectedFilter && (
            <div className="hero-filter-chips">
              <span className="chips-label">Quick Filter:</span>
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-chip ${selectedFilter === filter.id ? "active" : ""}`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Highlights Counters */}
        <div className="hero-highlights">
          <div className="highlight-item">
            <span className="highlight-number">10</span>
            <span className="highlight-label">Franchises</span>
          </div>
          <div className="highlight-divider"></div>
          <div className="highlight-item">
            <span className="highlight-number">74</span>
            <span className="highlight-label">Live Matches</span>
          </div>
          <div className="highlight-divider"></div>
          <div className="highlight-item">
            <span className="highlight-number">100%</span>
            <span className="highlight-label">Verified E-Passes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
