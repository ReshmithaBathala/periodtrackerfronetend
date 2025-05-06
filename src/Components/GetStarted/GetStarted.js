import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../animationData.json";
import "./GetStarted.css";
import MyCalendar from "../MyCalender/MyCalender";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleDateSelection = (selectedDate) => {
    localStorage.setItem("lastPeriodDate", selectedDate);
  };

  return (
    <div className="get-started-page">
      <div className="content-container">
        <div className="top-bar">
          <h2>Track Your Cycle</h2>
          <div className="progress-indicator">Step 1 of 3</div>
        </div>

        <div className="animation-container">
          <Lottie
            animationData={animationData}
            className="lottie-animation"
            loop={true}
          />
        </div>

        <div className="text-content">
          <h3>When did your last period start?</h3>
          <p className="subtext">
            Select the date to begin tracking your menstrual cycle
          </p>
        </div>

        <div className="calendar-wrapper">
          <MyCalendar onDateSelect={handleDateSelection} />
        </div>

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
          <button className="next-button" onClick={() => navigate("/cycle")}>
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

export default GetStarted;
