import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css"; // New custom styles

function MyCalendar({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <div className="custom-calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={date}
        calendarType="gregory"
        className="custom-calendar"
        tileClassName="custom-tile"
        navigationLabel={({ date, view }) => (
          <div className="custom-navigation-label">
            {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getFullYear()}
          </div>
        )}
        formatShortWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
      />
    </div>
  );
}

export default MyCalendar;
