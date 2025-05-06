import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSymptoms } from "../SymptomContext";
import "./AddSymptoms.css";

const AddSymptoms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateSymptoms } = useSymptoms();

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedSubSymptom, setSelectedSubSymptom] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/symptoms")
  //     .then((response) => {
  //       setSymptoms(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching symptoms data:", error);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get("https://periodcyclebackend.onrender.com/api/symptoms")
      .then((response) => {
        setSymptoms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching symptoms data:", error);
      });
  }, [location]);

  const handleSymptomChange = (symptomName) => {
    setSelectedSymptom(symptomName);
    setSelectedSubSymptom("");
    setSelectedSeverity("");
  };

  const handleSaveSymptoms = () => {
    const newSymptoms = {
      symptom: selectedSymptom,
      subSymptom: selectedSubSymptom,
      severity: selectedSeverity,
    };
    updateSymptoms(newSymptoms);
    navigate("/cycle-tracker");
  };

  // Symptom icons mapping
  const symptomIcons = {
    Headache: "🤕",
    Cramps: "🦵",
    Fatigue: "😴",
    Nausea: "🤢",
    "Back Pain": "💢",
    "Mood Swings": "😵‍💫",
    Bloating: "🎈",
  };

  // Severity data
  const severityData = [
    { level: "Light", emoji: "🩸", desc: "Barely noticeable or minimal flow" },
    {
      level: "Moderate",
      emoji: "💮",
      desc: "Manageable symptoms or moderate flow",
    },
    { level: "Heavy", emoji: "🌕", desc: "Intense cramps or heavy bleeding" },
  ];

  return (
    <div className="add-symptoms-page">
      <div className="symptoms-header">
        {/* <button
          className="back-button"
          onClick={() => navigate("/cycle-tracker")}
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
        </button> */}
        <h2>Track Your Symptoms</h2>
        <div className="progress-indicator">
          <div
            className={`progress-step ${
              selectedSymptom ? "active" : "current"
            }`}
          >
            1
          </div>
          <div
            className={`progress-step ${selectedSubSymptom ? "active" : ""}`}
          >
            2
          </div>
          <div className={`progress-step ${selectedSeverity ? "active" : ""}`}>
            3
          </div>
        </div>
      </div>

      <div className="symptoms-flow">
        {/* Step 1: Main Symptom Selection */}
        <div
          className={`symptoms-step ${!selectedSymptom ? "active-step" : ""}`}
        >
          <h3 style={{ paddingLeft: 20, textAlign: "center" }}>
            What's bothering you today?
          </h3>
          <div className="symptoms-grid">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className={`symptom-card ${
                  selectedSymptom === symptom.name ? "selected" : ""
                }`}
                onClick={() => handleSymptomChange(symptom.name)}
              >
                <div className="symptom-icon">{symptomIcons[symptom.name]}</div>
                <div className="symptom-name">{symptom.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Sub-Symptom Selection */}
        {selectedSymptom && (
          <div
            className={`symptoms-step ${
              !selectedSubSymptom ? "active-step" : ""
            }`}
          >
            <h3>Tell us more about your {selectedSymptom.toLowerCase()}</h3>
            <div className="subsymptoms-container">
              {symptoms
                .find((symptom) => symptom.name === selectedSymptom)
                ?.subSymptoms.map((subSymptom, index) => (
                  <div
                    key={index}
                    className={`subsymptom-card ${
                      selectedSubSymptom === subSymptom ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSubSymptom(subSymptom)}
                  >
                    {subSymptom}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 3: Severity Selection */}
        {selectedSubSymptom && (
          <div
            className={`symptoms-step ${
              !selectedSeverity ? "active-step" : ""
            }`}
          >
            <h3 style={{ textAlign: "center" }}>
              How intense is your {selectedSubSymptom.toLowerCase()}?
            </h3>
            <div
              className="severity-container"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {severityData.map((item) => (
                <div
                  key={item.level}
                  className={`severity-card ${
                    selectedSeverity === item.level ? "selected" : ""
                  } ${item.level.toLowerCase()}`}
                  onClick={() => setSelectedSeverity(item.level)}
                >
                  <div className="severity-emoji">{item.emoji}</div>
                  <div className="severity-level">{item.level}</div>
                  <div className="severity-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedSeverity && (
        <button className="save-button" onClick={handleSaveSymptoms}>
          <span>Save Symptoms</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L10 17L20 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AddSymptoms;
