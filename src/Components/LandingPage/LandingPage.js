import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Container1 from "../Container1/Container1";
import Container2 from "../Container2/Container2";
import Container3 from "../Container3/Container3";

const LandingPage = ({ onBack }) => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <button className="back-button" onClick={onBack}>
        &larr;
      </button>
      <Container1 />
      <Container2 />
      <Container3 />
      <p className="small-note">
        Please note that your data stays private and secure. You can update or
        delete it anytime
      </p>
      <button className="get-started" onClick={() => navigate("/get-started")}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
