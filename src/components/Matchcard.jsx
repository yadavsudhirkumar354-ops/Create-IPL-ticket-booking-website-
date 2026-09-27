
import { useState } from "react";

function Matchcard({ team1, team2, date, venue, price }) {

  const [tickets, setTickets] = useState(1);

  const total = tickets * price;

  return (
    <div className="match-card">

      <h2>{team1} vs {team2}</h2>

      <p>Date: {date}</p>

      <p>Venue: {venue}</p>

      <p>Ticket Price: ₹{price}</p>

      <button onClick={() => setTickets(tickets - 1)}>
        -
      </button>

      <span> {tickets} </span>

      <button onClick={() => setTickets(tickets + 1)}>
        +
      </button>

      <p>Total Price: ₹{total}</p>

      <button>Book Now</button>

    </div>
  );
}

export default Matchcard;


