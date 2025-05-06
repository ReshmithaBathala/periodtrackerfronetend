import React from "react";
import "./Container3.css";
import { useNavigate } from "react-router-dom";

const features = [
  {
    img: "http://www.freeiconspng.com/uploads/calendar-icon-png-23.png",
    title: "Smart Predictions",
    desc: "Get personalized insights based on your cycle",
  },
  {
    img: "https://tse1.mm.bing.net/th?id=OIP.6SmIJ7Ipa161KETJcs98ywHaJ4&pid=Api&P=0&h=180",
    title: "Doctor Connect",
    desc: "Share accurate data with your gynecologist",
  },
  {
    img: "https://i.pinimg.com/originals/81/46/56/81465669b53e9dbac2c32a02b141ee00.jpg",
    title: "Body Awareness",
    desc: "Track symptoms & patterns effortlessly",
  },
  {
    img: "https://tse1.mm.bing.net/th?id=OIP.A8d-EeSlSonYXTjFXtKLHAHaHa&pid=Api&P=0&h=180",
    title: "Cycle Forecast",
    desc: "Know when your period & ovulation are coming",
  },
];

const Container3 = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/cycle-tracker`);
  };

  return (
    <div className="container3">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            className="feature-card"
            key={index}
            onClick={() => handleClick(index)}
          >
            <div className="feature-icon-container">
              <img
                src={feature.img}
                alt={feature.title}
                className="feature-icon"
              />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container3;
