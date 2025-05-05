import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import calendar from "../../calender.json";
import "./Cycle.css";

const Cycle = () => {
  const [days, setDays] = useState(5);
  const navigate = useNavigate();
  const handleCycleLengthChange = (newDays) => {
    localStorage.setItem("cycleLength", newDays); // Save the cycle length to localStorage
  };

  return (
    <div className="get-started-page">
      <div className="top-bar">
        <h2>Add Some Information</h2>
        <button className="close-btn" onClick={() => navigate("/")}>
          ❌
        </button>
      </div>

      <div className="content-container">
        <Lottie animationData={calendar} className="lottie" />
        <h3>How long is your average cycle?</h3>
        <p>A little hint-cycles usually last 24-38 days</p>

        <input
          type="range"
          min="24"
          max="40"
          value={days}
          onChange={(e) => {
            setDays(e.target.value);
            handleCycleLengthChange(e.target.value);
          }}
          className="range-slider"
        />
        <div className="day-value">{days} Days</div>

        <div className="button-row">
          <button className="back-btn" onClick={() => navigate("/get-started")}>
            ← Back
          </button>
          <button className="next-btn" onClick={() => navigate("/last-days")}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cycle;
