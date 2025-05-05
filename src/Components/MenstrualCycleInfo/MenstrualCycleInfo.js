import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenstrualCycleInfo.css";

const MenstrualCycleInfo = () => {
  return (
    <div className="cycle-info">
      <button className="back-button" onClick={() => window.history.back()}>
        &larr; Back
      </button>

      <h1>Understanding the Menstrual Cycle</h1>

      <p>
        The menstrual cycle is a natural process that involves the changes that
        occur in a woman's body to prepare for a possible pregnancy. The cycle
        typically lasts about 28 days but can vary from woman to woman.
      </p>

      <h2>Phases of the Menstrual Cycle</h2>
      <ul>
        <li>
          <strong>Menstrual Phase:</strong> The first phase of the cycle,
          lasting about 3-7 days, where the uterus sheds its lining, resulting
          in menstruation (period).
        </li>
        <li>
          <strong>Follicular Phase:</strong> This phase begins right after the
          period ends. Hormones start to prepare the ovaries for egg release.
        </li>
        <li>
          <strong>Ovulation Phase:</strong> This is the midpoint of the cycle,
          where an egg is released from the ovary and moves down the fallopian
          tube in preparation for fertilization.
        </li>
        <li>
          <strong>Luteal Phase:</strong> The phase where the body prepares for a
          potential pregnancy. If the egg isn't fertilized, hormone levels drop,
          leading to menstruation.
        </li>
      </ul>

      <h2>Impact on Well-being</h2>
      <p>
        The menstrual cycle can affect emotional, physical, and mental health.
        Women might experience symptoms like bloating, fatigue, mood swings, and
        cramps, especially during the menstrual and luteal phases.
      </p>
    </div>
  );
};

export default MenstrualCycleInfo;
