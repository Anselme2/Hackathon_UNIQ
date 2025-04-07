import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Assure-toi d'importer AxiosError
import { useNavigate } from "react-router-dom"; // Importer le hook useNavigate

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialiser le hook useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login/", {
        email,
        password,
      });

      // Si la réponse est un message d'OTP, on redirige l'utilisateur vers la page de saisie de l'OTP
      if (response.data.message === "OTP envoyé") {
        alert("Un code OTP a été envoyé à votre email");
        navigate("/verify-otp"); // Redirection vers la page OTP
      }
    } catch (err) {
      // Ici, on vérifie si err est bien une erreur Axios
      if (err instanceof AxiosError) {
        setError("Erreur de connexion : " + (err.response?.data?.error || "Une erreur est survenue"));
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Connexion</h3>
        {error && <div className="alert alert-danger">{error}</div>} {/* Affichage de l'erreur */}
        <form onSubmit={handleLogin}>
          <div className="mb-3" style={{ textAlign: "left" }}>
            <label htmlFor="email" className="form-label text-start">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ textAlign: "left" }}>
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" id="keepSignedIn" className="form-check-input me-2" />
              <label htmlFor="keepSignedIn" className="form-check-label">Souvenir de moi</label>
            </div>
            <a href="#" className="text-primary">Mot de passe oublié ?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Chargement..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
