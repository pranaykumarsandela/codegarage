import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import ClosedPage from "./pages/ClosedPage";

import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/buttons.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* Navbar always visible */}
        <Navbar />

        {/* Page routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/payment" element={<PaymentPage />} />   {/* Payment Page */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/closed" element={<ClosedPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
