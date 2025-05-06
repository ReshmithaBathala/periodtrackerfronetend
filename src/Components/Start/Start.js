import React from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="start-container">
      <button className="centered-button" onClick={handleClick}>
        <div className="button-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/12260/12260600.png"
            alt="Cycle"
            className="button-icon"
          />
          <span className="text">Cycle</span>
          <span className="arrow">&#8594;</span>
        </div>
      </button>
      <p className="welcome-text">Click to begin your journey</p>
    </div>
  );
};

export default Start;
