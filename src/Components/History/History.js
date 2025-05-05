import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setHistory(response.data.history);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  return (
    <div className="history-page">
      <button
        className="back-button"
        onClick={() => navigate("/cycle-tracker")}
      >
        &larr; Back to Cycle Tracker
      </button>

      <h3>All Period History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((period, index) => (
            <li key={index}>
              {`Period ${index + 1}: ${period.date} - ${period.details}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default History;
