import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./Components/Start/Start";
import LandingPage from "./Components/LandingPage/LandingPage";
import GetStarted from "./Components/GetStarted/GetStarted";
import Cycle from "./Components/Cycle/Cycle";
import LastDays from "./Components/LastDays/LastDays";
import Problems from "./Components/Problems/Problems";
import CycleTracker from "./Components/CycleTracker/CycleTracker";
import History from "./Components/History/History";
import AddSymptoms from "./Components/AddSymptoms/AddSymptoms";
import MenstrualCycleInfo from "./Components/MenstrualCycleInfo/MenstrualCycleInfo";
import LogPeriod from "./Components/LogPeriod/LogPeriod";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/cycle" element={<Cycle />} />
        <Route path="/last-days" element={<LastDays />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/cycle-tracker" element={<CycleTracker />} />
        <Route path="/history" element={<History />} />
        <Route path="/add-symptoms" element={<AddSymptoms />} />
        <Route path="/menstrual-cycle-info" element={<MenstrualCycleInfo />} />
        <Route path="/log-period" element={<LogPeriod />} />
      </Routes>
    </Router>
  );
}

export default App;
