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
    localStorage.setItem("condition", problem); // Save selected condition to localStorage
  };
  const handleSubmit = async () => {
    const payload = {
      periodLength: localStorage.getItem("periodLength"),
      lastPeriodDate: localStorage.getItem("lastPeriodDate"),
      condition: selectedProblem,
    };

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
    <div className="get-started-page">
      <div className="top-bar">
        <h2>Add Some Information</h2>
        <button className="close-btn" onClick={() => navigate("/")}>
          ❌
        </button>
      </div>

      <div className="content-container">
        <Lottie animationData={problem} className="lottie" />
        <h3>Any conditions affecting your cycle?</h3>
        <p>Sharing helps your doctor care better.</p>

        <div className="problems-container">
          {problemsList.map((problem, index) => (
            <div
              key={index}
              className={`problem-card ${
                selectedProblem === problem ? "selected" : ""
              }`}
              onClick={() => handleSelectProblem(problem)}
            >
              {problem}
            </div>
          ))}
        </div>

        <div className="button-row">
          <button className="back-btn" onClick={() => navigate("/last-days")}>
            ← Back
          </button>
          <button className="next-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problems;
