import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Standings from "./pages/Standings";
import BettingOdds from "./pages/BettingOdds";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/betting-odds" element={<BettingOdds />} />
      </Routes>
    </Router>
  );
}

export default App;
