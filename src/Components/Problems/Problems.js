import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import problem from "../../problem.json";
import "./Problems.css";

const problemsList = [
  "None",
  "PCOS",
  "Endometriosis",
  "UTI",
  "Perimenopause/Menopause",
  "Uterine Fibroids",
  "Anemia",
  "Bleeding Disorder",
  "Fibromyalgia",
  "IBS (Irritable Bowel Syndrome)",
  "Pregnancy",
  "Postpartum/Breastfeeding",
];

const Problems = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const navigate = useNavigate();

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    localStorage.setItem("condition", problem);
  };

  const handleSubmit = async () => {
    const payload = {
      periodLength: localStorage.getItem("periodLength"),
      lastPeriodDate: localStorage.getItem("lastPeriodDate"),
      condition: selectedProblem,
    };

    try {
      const response = await fetch(
        "https://periodcyclebackend.onrender.com/api/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Data submitted successfully!");
        navigate("/home");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="problems-page">
      <div className="header-container">
        {/* <button className="back-button" onClick={() => navigate("/last-days")}>
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
          <h2>Health Information</h2>
          <p className="completion-text">Almost done!</p>
        </div>

        <div className="animation-container">
          <Lottie
            animationData={problem}
            className="lottie-animation"
            loop={true}
          />
        </div>

        <div className="input-section">
          <h3>Any conditions affecting your cycle?</h3>
          <p className="hint-text">
            Sharing helps your doctor provide better care
          </p>

          <div className="problems-grid">
            {problemsList.map((problem, index) => (
              <button
                key={index}
                className={`problem-card ${
                  selectedProblem === problem ? "selected" : ""
                }`}
                onClick={() => handleSelectProblem(problem)}
              >
                {problem}
              </button>
            ))}
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
            className="submit-button"
            onClick={handleSubmit}
            disabled={!selectedProblem}
          >
            Complete Setup
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

export default Problems;
