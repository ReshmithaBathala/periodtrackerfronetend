import React from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <button className="centered-button" onClick={handleClick}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/12260/12260600.png"
        alt="Cycle"
      />
      <span className="text">Cycle</span>
      <span className="arrow">&#8594;</span>
    </button>
  );
};

export default Start;
