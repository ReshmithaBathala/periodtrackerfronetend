import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "react-calendar/dist/Calendar.css";
import "./CycleTracker.css";

const CycleTracker = () => {
  const navigate = useNavigate();
  const [nextPeriod, setNextPeriod] = useState(14);
  const [cycleInsights, setCycleInsights] = useState({
    averageLength: 28,
    variation: 2,
    periodAverageLength: 5,
    periodVariation: 1,
  });
  const [history, setHistory] = useState([]);
  const [symptoms, setSymptoms] = useState(["Cramps", "Headache", "Fatigue"]);
  const [showCalendar, setShowCalendar] = useState(false);
  const hasGainedEnoughHistory = useRef(false);
  const isHistorySufficient = history && history.length >= 3;

  // Chart configuration
  const chartContainerStyle = {
    width: "90%",
    height: "390px",
    margin: "0 auto 20px",
    paddingBottom: "30px",
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ff4785",
          font: { size: 12 },
          boxWidth: 12,
          padding: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#ff6b9d",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} days`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: "#ff4785", font: { size: 10, weight: "500" } },
      },
      y: {
        grid: { drawBorder: false, color: "rgba(255, 107, 157, 0.1)" },
        ticks: {
          color: "#ff4785",
          font: { size: 10, weight: "500" },
          padding: 5,
          callback: (value) => `${value} ${value !== 1 ? "days" : "day"}`,
        },
      },
    },
  };

  const pieChartOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: "right",
        labels: {
          color: "#ff4785",
          font: { size: 10 },
          boxWidth: 10,
          padding: 8,
          usePointStyle: true,
        },
      },
      tooltip: {
        ...commonChartOptions.plugins.tooltip,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} times`,
        },
      },
    },
  };

  // Chart data
  const cycleLengthData = {
    labels: history.slice(0, 3).map((_, i) => `Cycle ${i + 1}`),
    datasets: [
      {
        label: "Cycle Length",
        data: [28, 27, 29],
        backgroundColor: "rgba(255, 107, 157, 0.1)",
        borderColor: "#ff4785",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ff4785",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const periodLengthData = {
    labels: history.slice(0, 3).map((_, i) => `Period ${i + 1}`),
    datasets: [
      {
        label: "Period Length",
        data: [5, 4, 6],
        backgroundColor: "#ffb8d1",
        borderColor: "#ff6b9d",
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const symptomFrequencyData = {
    labels: symptoms,
    datasets: [
      {
        label: "Symptom Frequency",
        data: [3, 5, 2],
        backgroundColor: ["#ff9eb5", "#ff6b9d", "#ff4785"],
        borderWidth: 0,
        cutout: "65%",
      },
    ],
  };

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  useEffect(() => {
    axios
      .get("https://periodcyclebackend.onrender.com/api/data")
      .then((response) => {
        const data = response.data;
        setNextPeriod(data.nextPeriod);
        setCycleInsights(data.cycleInsights);
        setHistory(data.history);
        setSymptoms(data.symptoms);
        if (data.history.length >= 3) hasGainedEnoughHistory.current = true;
      })
      .catch(console.error);
  }, []);

  return (
    <div className="cycle-tracker-page">
      {/* Header */}
      <div className="header">
        <button
          className="back-button"
          onClick={() => navigate("/")}
          style={{ margin: 15 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#FF6B9D" strokeWidth="2" />
          </svg>
        </button>
        <h1>Cycle Tracker</h1>
        <button className="icon-button" onClick={() => navigate("/settings")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="#FF6B9D"
            />
            <path
              d="M19.4 15C19.2669 15.3016 19.227 15.6363 19.2851 15.9606C19.3432 16.2848 19.4968 16.5834 19.725 16.8167C19.9532 17.05 20.2446 17.2074 20.5601 17.2679C20.8756 17.3284 21.1995 17.2893 21.488 17.156L21.6 17.1C21.8 17 22 16.8 22 16.5V15.5C22 15.2 21.9 15 21.6 14.9L21.488 14.844C21.1995 14.7107 20.8756 14.6716 20.5601 14.7321C20.2446 14.7926 19.9532 14.95 19.725 15.1833C19.4968 15.4166 19.3432 15.7152 19.2851 16.0394C19.227 16.3637 19.2669 16.6984 19.4 17L19.4 15Z"
              stroke="#FF6B9D"
            />
          </svg>
        </button>
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        {/* Next Period Card */}
        <div className="dashboard-card highlight-card">
          <div className="card-content">
            <h3>Next Period</h3>
            <div className="countdown">
              <span className="days">{nextPeriod}</span>
              <span className="label">days</span>
            </div>
            <p>
              Estimated start:{" "}
              {new Date(
                Date.now() + nextPeriod * 86400000
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="card-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                stroke="#FF6B9D"
              />
              <path
                d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329"
                stroke="#FF6B9D"
              />
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-button" onClick={toggleCalendar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                stroke="#FF6B9D"
              />
            </svg>
            <span>Calendar</span>
          </button>
          <button
            className="action-button"
            onClick={() => navigate("/log-period")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="#FF6B9D"
              />
              <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="#FF6B9D" />
            </svg>
            <span>Log Period</span>
          </button>
          <button
            className="action-button"
            onClick={() => navigate("/add-symptoms")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="#FF6B9D"
              />
              <path d="M8 12H16" stroke="#FF6B9D" />
              <path d="M12 16V8" stroke="#FF6B9D" />
            </svg>
            <span>Add Symptoms</span>
          </button>
        </div>

        {/* Cycle Insights */}
        <div className="section">
          <h2 className="section-title">Cycle Insights</h2>
          {!isHistorySufficient ? (
            <div className="insight-card disabled-card">
              <div className="card-content">
                <h3>More Data Needed</h3>
                <p>Log at least 3 periods to unlock personalized insights</p>
                <button
                  className="primary-button"
                  onClick={() => navigate("/get-started")}
                >
                  Log Your Periods
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                {Object.entries(cycleInsights).map(([key, value]) => (
                  <div key={key} className="stat-card">
                    <h4>{key.split(/(?=[A-Z])/).join(" ")}</h4>
                    <p className="stat-value">
                      {key.includes("Variation") ? `±${value}` : value}
                      <span> days</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="chart-container" style={chartContainerStyle}>
                  <h3>Cycle Length History</h3>
                  <Line data={cycleLengthData} options={commonChartOptions} />
                </div>

                <div className="chart-container" style={chartContainerStyle}>
                  <h3>Period Length History</h3>
                  <Bar data={periodLengthData} options={commonChartOptions} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Symptoms Section */}
        <div className="section">
          <h2 className="section-title">Symptoms</h2>
          <div className="symptoms-container">
            {symptoms.length > 0 ? (
              <>
                <div className="symptoms-list">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="symptom-tag">
                      {symptom}
                    </div>
                  ))}
                </div>
                <div
                  className="chart-container"
                  style={{ ...chartContainerStyle, height: "220px" }}
                >
                  <h3>Symptom Frequency</h3>
                  <Pie data={symptomFrequencyData} options={pieChartOptions} />
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No symptoms logged yet</p>
                <button
                  className="primary-button"
                  onClick={() => navigate("/add-symptoms")}
                >
                  Add Symptoms
                </button>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        <div className="section">
          <h2 className="section-title">Recent History</h2>
          {!isHistorySufficient ? (
            <div className="empty-state">
              <p>Log more periods to view history</p>
            </div>
          ) : (
            <>
              <div className="history-list">
                {history.slice(0, 3).map((period, index) => (
                  <div key={index} className="history-item">
                    <div className="date">{period.date}</div>
                    <div className="details">{period.details}</div>
                  </div>
                ))}
              </div>
              <button
                className="text-button"
                onClick={() => navigate("/history")}
              >
                View Full History →
              </button>
            </>
          )}
        </div>

        {/* Learn More Section */}
        <div
          className="section"
          style={{ width: "40%", display: "flex", justifyContent: "center" }}
        >
          <button
            className="learn-more-button"
            onClick={() => navigate("/menstrual-cycle-info")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="#FF6B9D"
              />
              <path
                d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001"
                stroke="#FF6B9D"
              />
              <path d="M12 17H12.01" stroke="#FF6B9D" />
            </svg>
            Learn About Menstrual Health
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Cycle Calendar</h3>
              <button className="close-button" onClick={toggleCalendar}>
                &times;
              </button>
            </div>
            <Calendar className="custom-calendar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleTracker;
