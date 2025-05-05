import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate); // Update the local state
    onDateSelect(selectedDate); // Send the selected date to the parent component
  };

  return (
    <div className="calendar-wrapper">
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
}

export default MyCalendar;
