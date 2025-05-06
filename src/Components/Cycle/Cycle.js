import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import calendar from "../../calender.json";
import "./Cycle.css";

const Cycle = () => {
  const [days, setDays] = useState(28);
  const navigate = useNavigate();

  const handleCycleLengthChange = (newDays) => {
    localStorage.setItem("cycleLength", newDays);
  };

  return (
    <div className="cycle-page">
      <div className="header-container">
        {/* <button
          className="back-button"
          onClick={() => navigate("/get-started")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#FF6B9D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button> */}
      </div>

      <div className="content-container">
        <div className="top-section">
          <h2>Your Cycle Details</h2>
          <p className="progress-text">Step 2 of 3</p>
        </div>

        <div className="animation-container">
          <Lottie
            animationData={calendar}
            className="lottie-animation"
            loop={true}
          />
        </div>

        <div className="input-section">
          <h3>How long is your average cycle?</h3>
          <p className="hint-text">A typical cycle lasts between 24-38 days</p>

          <div className="slider-container">
            <input
              type="range"
              min="24"
              max="40"
              value={days}
              onChange={(e) => {
                setDays(e.target.value);
                handleCycleLengthChange(e.target.value);
              }}
              className="cycle-slider"
            />
            <div className="slider-labels">
              <span>24</span>
              <span>40</span>
            </div>
          </div>

          <div className="days-display">
            <span className="days-value">{days}</span>
            <span className="days-unit">Days</span>
          </div>
        </div>

        {/* <div className="button-container">
          
        </div> */}
        <div className="button-group">
          <button className="back-button" onClick={() => navigate("/")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#FF6B9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <button
            className="next-button full-width"
            onClick={() => navigate("/last-days")}
          >
            Continue
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cycle;
