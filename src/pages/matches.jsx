import Matchcard from "../components/Matchcard";

function Matches() {

  const matches = [
    {
      team1: "CSK",
      team2: "MI",
      date: "10 April",
      venue: "Mumbai",
      price: 1500
    },
    {
      team1: "RCB",
      team2: "KKR",
      date: "12 April",
      venue: "Bangalore",
      price: 1200
    },
    {
      team1: "GT",
      team2: "RR",
      date: "15 April",
      venue: "Ahmedabad",
      price: 1000
    }
  ];

  return (
    <div>
      <h1>Upcoming Matches</h1>

      {matches.map((match, index) => (
        <Matchcard
          key={index}
          team1={match.team1}
          team2={match.team2}
          date={match.date}
          venue={match.venue}
          price={match.price}
        />
      ))}
    </div>
  );
}

export default Matches;