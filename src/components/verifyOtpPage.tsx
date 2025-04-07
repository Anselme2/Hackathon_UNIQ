import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Assure-toi d'importer AxiosError

const VerifyOtpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/auth/verify-otp/", {
        email,
        otp_code: otpCode,
      });

      setMessage("OTP vérifié avec succès !");
      // Redirige vers la page d'accueil ou une autre page après la vérification réussie
      // window.location.href = "/home"; // Exemple de redirection
    } catch (err) {
      // Ici, on vérifie si err est bien une erreur Axios
      if (err instanceof AxiosError) {
        setError("Erreur lors de la vérification de l'OTP : " + (err.response?.data?.error || "Une erreur est survenue"));
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
        <h3 className="text-center mb-3">Vérification de l'OTP</h3>
        {message && <div className="alert alert-success">{message}</div>} {/* Affichage du message de succès */}
        {error && <div className="alert alert-danger">{error}</div>} {/* Affichage de l'erreur */}
        <form onSubmit={handleVerifyOtp}>
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
            <label htmlFor="otpCode" className="form-label">Code OTP</label>
            <input
              type="text"
              className="form-control"
              id="otpCode"
              placeholder="Entrez le code OTP"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Vérification..." : "Vérifier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
