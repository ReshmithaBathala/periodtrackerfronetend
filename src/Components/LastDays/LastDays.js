import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import time from "../../time.json";
import "./LastDays.css";

const LastDays = () => {
  const [periodLength, setPeriodLength] = useState(4);
  const navigate = useNavigate();

  const handlePeriodLengthChange = (newLength) => {
    localStorage.setItem("periodLength", newLength);
  };

  return (
    <div className="last-days-page">
      <div className="header-container">
        {/* <button className="back-button" onClick={() => navigate("/cycle")}>
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
          <h2>Period Details</h2>
          <p className="progress-text">Step 3 of 3</p>
        </div>

        <div className="animation-container">
          <Lottie
            animationData={time}
            className="lottie-animation"
            loop={true}
          />
        </div>

        <div className="input-section">
          <h3>How long does your period last?</h3>
          <p className="hint-text">
            Most periods last 3-7 days, but it varies!
          </p>

          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="9"
              value={periodLength}
              onChange={(e) => {
                setPeriodLength(e.target.value);
                handlePeriodLengthChange(e.target.value);
              }}
              className="period-slider"
            />
            <div className="slider-labels">
              <span>1</span>
              <span>9</span>
            </div>
          </div>

          <div className="days-display">
            <span className="days-value">{periodLength}</span>
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
          <button className="next-button" onClick={() => navigate("/problems")}>
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

export default LastDays;
