import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup";
import './App.css'
import LoginPage from "./components/login"; // Assure-toi que le chemin est correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
