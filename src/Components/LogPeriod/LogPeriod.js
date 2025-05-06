import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./LogPeriod.css"; // Create this new CSS file

function MyCalendar({ onDateSelect }) {
  const [date, setDate] = useState(new Date());
  // const location = useLocation();
  const navigate = useNavigate();

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (typeof onDateSelect === "function") {
      onDateSelect(selectedDate);
    } else {
      console.log("Date selected:", selectedDate);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Select Date</h2>
      </div>

      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="custom-calendar"
        />
      </div>

      <div className="calendar-actions">
        <button
          className="calendar-btn back-btn"
          onClick={() => navigate("/cycle-tracker")}
        >
          <svg
            width="16"
            height="16"
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
          className="calendar-btn save-btn"
          onClick={() => navigate("/cycle-tracker")}
        >
          Save Selection
        </button>
      </div>
    </div>
  );
}

export default MyCalendar;
