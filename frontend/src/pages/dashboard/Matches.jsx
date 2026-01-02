import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";   // 🔔 notification import

function Matches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/api/matches")
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) {
          const dummyMatches = [
            {
              _id: "1",
              wasteType: "Plastic",
              location: "Delhi",
            },
            {
              _id: "2",
              wasteType: "E-Waste",
              location: "Noida",
            },
          ];

          setMatches(dummyMatches);

          // 🔔 notification for new matches
          toast("You have new match suggestions");
        } else {
          setMatches(data);

          // 🔔 notification for new matches
          toast("You have new match suggestions");
        }
      })
      .catch(err => {
        console.log(err);

        const dummyMatches = [
          {
            _id: "1",
            wasteType: "Plastic",
            location: "Delhi",
          },
          {
            _id: "2",
            wasteType: "E-Waste",
            location: "Noida",
          },
        ];

        setMatches(dummyMatches);

        // 🔔 notification even if API fails
        toast("You have new match suggestions");
      });
  }, []);

  return (
    <div>
      <h2>Matched Opportunities</h2>

      {matches.length === 0 && <p>No matches found</p>}

      {matches.map(match => (
        <div
          key={match._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <p><b>Waste Type:</b> {match.wasteType}</p>
          <p><b>Location:</b> {match.location}</p>

          <button
            onClick={() =>
              navigate(`/dashboard/volunteer/messages/${match._id}`)
            }
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default Matches;
