import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSymptoms } from "../SymptomContext"; // Import the custom hook
import "./AddSymptoms.css";

const AddSymptoms = () => {
  const navigate = useNavigate();
  const { updateSymptoms } = useSymptoms(); // Get the updateSymptoms function
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedSubSymptom, setSelectedSubSymptom] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/symptoms")
      .then((response) => {
        setSymptoms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching symptoms data:", error);
      });
  }, []);

  const handleSymptomChange = (e) => {
    setSelectedSymptom(e.target.value);
    setSelectedSubSymptom("");
    setSelectedSeverity("");
  };

  const handleSubSymptomChange = (e) => {
    setSelectedSubSymptom(e.target.value);
  };

  const handleSeverityChange = (e) => {
    setSelectedSeverity(e.target.value);
  };

  const handleSaveSymptoms = () => {
    const newSymptoms = {
      symptom: selectedSymptom,
      subSymptom: selectedSubSymptom,
      severity: selectedSeverity,
    };
    updateSymptoms(newSymptoms); // Save the symptom data to context
    navigate("/cycle-tracker");
  };

  return (
    <div className="add-symptoms-page">
      <button
        className="back-button"
        onClick={() => navigate("/cycle-tracker")}
      >
        &larr; Back
      </button>

      <h2>Add Symptoms</h2>

      <div className="select-symptom">
        <label>Select Symptom:</label>
        <select onChange={handleSymptomChange} value={selectedSymptom}>
          <option value="">Select Symptom</option>
          {symptoms.map((symptom, index) => (
            <option key={index} value={symptom.name}>
              {symptom.name}
            </option>
          ))}
        </select>
      </div>

      {selectedSymptom && (
        <div className="select-sub-symptom">
          <label>Select Sub-Symptom:</label>
          <select onChange={handleSubSymptomChange} value={selectedSubSymptom}>
            <option value="">Select Sub-Symptom</option>
            {symptoms
              .find((symptom) => symptom.name === selectedSymptom)
              ?.subSymptoms.map((subSymptom, index) => (
                <option key={index} value={subSymptom}>
                  {subSymptom}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedSubSymptom && (
        <div className="select-severity">
          <label>Select Severity:</label>
          <label>
            <input
              type="radio"
              name="severity"
              value="Light"
              checked={selectedSeverity === "Light"}
              onChange={handleSeverityChange}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="severity"
              value="Mild"
              checked={selectedSeverity === "Mild"}
              onChange={handleSeverityChange}
            />
            Mild
          </label>
          <label>
            <input
              type="radio"
              name="severity"
              value="Severe"
              checked={selectedSeverity === "Severe"}
              onChange={handleSeverityChange}
            />
            Severe
          </label>
        </div>
      )}

      <button className="save-button" onClick={handleSaveSymptoms}>
        Save Symptoms
      </button>
    </div>
  );
};

export default AddSymptoms;
