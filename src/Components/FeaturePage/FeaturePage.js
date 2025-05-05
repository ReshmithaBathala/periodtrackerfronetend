import { useParams } from "react-router-dom";

const features = [
  "Period Tracker",
  "Ovulation Predictor",
  "Health Insights",
  "Reminders",
];

const FeaturePage = () => {
  const { id } = useParams();
  const title = features[id] || "Feature";

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>{title}</h1>
      <p>Detailed content about {title} coming soon...</p>
    </div>
  );
};

export default FeaturePage;
