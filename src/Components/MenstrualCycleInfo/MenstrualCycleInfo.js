import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenstrualCycleInfo.css";

const MenstrualCycleInfo = () => {
  const navigate = useNavigate();

  const cyclePhases = [
    {
      title: "Menstrual Phase",
      days: "Days 1-5",
      description:
        "The uterus sheds its lining, resulting in menstruation (period).",
      symptoms: ["Cramps", "Fatigue", "Bloating", "Mood swings"],
      icon: "🩸",
    },
    {
      title: "Follicular Phase",
      days: "Days 6-14",
      description:
        "Hormones prepare the ovaries for egg release as follicles mature.",
      symptoms: ["Increasing energy", "Improved mood", "Clear skin"],
      icon: "🌱",
    },
    {
      title: "Ovulation Phase",
      days: "Day 14",
      description:
        "An egg is released from the ovary and travels down the fallopian tube.",
      symptoms: [
        "Mild abdominal pain",
        "Increased libido",
        "Cervical mucus changes",
      ],
      icon: "🥚",
    },
    {
      title: "Luteal Phase",
      days: "Days 15-28",
      description: "The body prepares for potential pregnancy or menstruation.",
      symptoms: [
        "Breast tenderness",
        "Bloating",
        "Mood changes",
        "Food cravings",
      ],
      icon: "🔄",
    },
  ];

  const wellnessTips = [
    "Stay hydrated to reduce bloating",
    "Gentle exercise can ease cramps",
    "Maintain a balanced diet with iron-rich foods",
    "Practice stress-reduction techniques",
    "Track your cycle to anticipate symptoms",
    "Use heat therapy for pain relief",
  ];

  return (
    <div className="cycle-info-page">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
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
        </button>
        <h1>Menstrual Health Guide</h1>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <h2>Understanding Your Cycle</h2>
          <p>
            The menstrual cycle is a natural process that prepares your body for
            pregnancy each month. While the average cycle lasts 28 days, normal
            cycles can range from 21 to 35 days.
          </p>
        </div>
        {/* <div className="hero-image"></div> */}
      </div>

      <div className="content-section">
        <h2 className="section-title">The Four Phases</h2>
        <p className="section-subtitle">
          Your cycle consists of distinct phases, each with unique hormonal
          changes and symptoms.
        </p>

        <div className="phase-cards">
          {cyclePhases.map((phase, index) => (
            <div key={index} className="phase-card">
              <div className="phase-header">
                <div className="phase-icon">{phase.icon}</div>
                <h3>{phase.title}</h3>
                <span className="phase-days">{phase.days}</span>
              </div>
              <p>{phase.description}</p>
              <div className="symptoms-list">
                <h4>Common Experiences:</h4>
                <ul>
                  {phase.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="wellness-section">
          <h2 className="section-title">Cycle Wellness Tips</h2>
          <p className="section-subtitle">
            Caring for your body throughout your cycle can help manage symptoms
            and promote wellbeing.
          </p>

          <div className="tips-grid">
            {wellnessTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-number">{index + 1}</div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="resource-section">
          <h2 className="section-title">Learn More</h2>
          <div className="resource-cards">
            <div className="resource-card">
              <h3>Cycle Tracking Benefits</h3>
              <p>
                Discover how tracking can help you understand your body better.
              </p>
              <button className="resource-button">Read Article</button>
            </div>
            <div className="resource-card">
              <h3>When to See a Doctor</h3>
              <p>Learn about symptoms that may need medical attention.</p>
              <button className="resource-button">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycleInfo;
