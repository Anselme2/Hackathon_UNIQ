import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup";
import './App.css'
import LoginPage from "./components/login"; // Assure-toi que le chemin est correct
import VerifyOtpPage from "./components/verifyOtpPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
