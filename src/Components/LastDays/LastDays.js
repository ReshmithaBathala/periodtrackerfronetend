import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import time from "../../time.json";
import "./LastDays.css";

const LastDays = () => {
  const [cycleLength, setCycleLength] = useState(4);
  const navigate = useNavigate();
  const handlePeriodLengthChange = (newLength) => {
    localStorage.setItem("periodLength", newLength); // Save the period length to localStorage
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
        <Lottie animationData={time} className="lottie" />
        <h3>How long does your period last?</h3>
        <p>Most periods last 3-7 days, but it varies!</p>

        <input
          type="range"
          min="1"
          max="9"
          value={cycleLength}
          onChange={(e) => {
            setCycleLength(e.target.value);
            handlePeriodLengthChange(e.target.value);
          }}
          className="range-slider"
        />
        <div className="day-value">{cycleLength} Days</div>

        <div className="button-row">
          <button className="back-btn" onClick={() => navigate("/cycle")}>
            ← Back
          </button>
          <button className="next-btn" onClick={() => navigate("/problems")}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastDays;
