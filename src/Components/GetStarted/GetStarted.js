import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../animationData.json";
import "./GetStarted.css";
import MyCalendar from "../MyCalender/MyCalender";

const GetStarted = () => {
  const navigate = useNavigate();
  const handleDateSelection = (selectedDate) => {
    localStorage.setItem("lastPeriodDate", selectedDate); // Save the date to localStorage
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
        <Lottie animationData={animationData} className="lottie" />

        <h3>When did your period start?</h3>
        <p>Please select the date you began your last cycle.</p>

        <MyCalendar onDateSelect={handleDateSelection} />

        <button className="next-btn" onClick={() => navigate("/cycle")}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
