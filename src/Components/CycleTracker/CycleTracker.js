import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CycleTracker.css";
import Calendar from "react-calendar"; // Add calendar component
import axios from "axios"; // For backend calls

const CycleTracker = () => {
  const navigate = useNavigate();
  const [nextPeriod, setNextPeriod] = useState(null);
  const [cycleInsights, setCycleInsights] = useState(null);
  const [mostLoggedSymptom, setMostLoggedSymptom] = useState(null);
  const [history, setHistory] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data") // Adjust the API URL if needed
      .then((response) => {
        const data = response.data;
        setNextPeriod(data.nextPeriod); // e.g., days until next period
        setCycleInsights(data.cycleInsights); // e.g., cycle insights data
        setMostLoggedSymptom(data.mostLoggedSymptom); // e.g., the most logged symptom
        setHistory(data.history); // e.g., past cycle history
        setSymptoms(data.symptoms); // e.g., symptoms data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Toggle Calendar Visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleLearnMoreClick = () => {
    navigate("/menstrual-cycle-info");
  };
  return (
    <div className="cycle-tracker-page">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back
      </button>

      {/* Container 1: Monthly View & Log Period */}
      <div className="container">
        <button className="monthly-view-btn" onClick={toggleCalendar}>
          Monthly View
        </button>
        <button className="log-period-btn" onClick={toggleCalendar}>
          Log Period
        </button>
        {showCalendar && <Calendar />}
      </div>

      {/* Container 2: Next Period */}
      <div className="container">
        <h3>Next Period in Days</h3>
        <p>{nextPeriod ? `${nextPeriod} days` : "Loading..."}</p>
      </div>

      {/* Container 3: Symptoms */}
      <div className="container">
        <h3>Symptoms</h3>
        <p>Select or log any symptoms you're experiencing:</p>
        {symptoms && symptoms.length > 0 ? (
          symptoms.map((symptom, index) => <div key={index}>{symptom}</div>)
        ) : (
          <p>No symptoms logged yet.</p>
        )}
        <div className="container">
          <button onClick={() => navigate("/add-symptoms")}>
            Add Symptoms
          </button>
        </div>
      </div>

      {/* Container 4: Cycle Insights */}
      <div className="container">
        <h3>Cycle Insights</h3>
        <p>Based on your last 3 cycles:</p>
        {cycleInsights ? (
          <ul>
            <li>Cycle Average Length: {cycleInsights.averageLength}</li>
            <li>Cycle Variation: {cycleInsights.variation}</li>
            <li>Period Average Length: {cycleInsights.periodAverageLength}</li>
            <li>Period Variation: {cycleInsights.periodVariation}</li>
          </ul>
        ) : (
          <p>Loading cycle insights...</p>
        )}
      </div>

      {/* Container 5: Most Logged Symptom */}
      <div className="container">
        <h3>Most Logged Symptom</h3>
        <p>Based on your last 3 cycles:</p>
        {mostLoggedSymptom ? <p>{mostLoggedSymptom}</p> : <p>Loading...</p>}
      </div>

      {/* Container 6: History */}
      <div className="container">
        <h3>History of Last 3 Periods</h3>
        {history && history.length > 0 ? (
          <ul>
            {history.slice(0, 3).map((period, index) => (
              <li key={index}>
                {`Period ${index + 1}: ${period.date} - ${period.details}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
        <button className="view-all-btn" onClick={() => navigate("/history")}>
          View All
        </button>
      </div>

      {/* Learn More Button */}
      <div className="learn-more">
        <button onClick={handleLearnMoreClick}>Learn More</button>
      </div>

      {/* Container 7: Graph of the Period */}
      <div className="container">
        <h3>Period Graph</h3>
        {/* Assuming you have a Graph component */}
        {/* <Graph data={history} /> */}
      </div>
    </div>
  );
};

export default CycleTracker;
