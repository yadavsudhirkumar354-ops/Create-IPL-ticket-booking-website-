
import { useState } from "react";

function Matchcard({ team1, team2, date, venue, price }) {

  const [tickets, setTickets] = useState(1);

  const total = tickets * price;

  const handleBookNow = () => {
    alert(`🎉 Successfully booked ${tickets} ticket(s) for ${team1} vs ${team2}!\nVenue: ${venue}\nDate: ${date}\nTotal Amount: ₹${total}`);
  };

  return (
    <div className="match-card">

      <h2>{team1} vs {team2}</h2>

      <p>Date: {date}</p>

      <p>Venue: {venue}</p>

      <p>Ticket Price: ₹{price}</p>

      <div style={{ margin: "12px 0" }}>
        <button onClick={() => setTickets((prev) => Math.max(1, prev - 1))}>
          -
        </button>

        <span> {tickets} </span>

        <button onClick={() => setTickets((prev) => prev + 1)}>
          +
        </button>
      </div>

      <p><strong>Total Price:</strong> ₹{total}</p>

      <button onClick={handleBookNow} style={{ marginTop: "10px", fontWeight: "bold" }}>
        Book Now
      </button>

    </div>
  );
}

export default Matchcard;


