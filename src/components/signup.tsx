import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Assurez-vous d'importer AxiosError
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate

const SignUp: React.FC = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Création de l'instance de navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Vérification si les champs sont vides
    if (!nom || !prenom || !email || !password) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    try {
      // Envoi des données d'inscription
      const response = await axios.post("http://localhost:8000/api/auth/register/", {
        email,
        password,
        username:nom,
        first_name: nom,
        last_name: prenom,
      });

      // Message de succès
      setSuccessMessage("Inscription réussie. Veuillez vérifier votre email pour l'OTP.");
      setError("");  // Réinitialiser l'erreur en cas de succès

      // Redirection vers la page de connexion après 2 secondes
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // Gestion d'erreur spécifique
      if (err instanceof AxiosError) { // Vérification si err est une instance d'AxiosError
        const errorMessage = err.response?.data?.message || "Une erreur s'est produite lors de l'inscription.";
        setError(errorMessage); // Afficher le message d'erreur spécifique de l'API
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
      setSuccessMessage("");  // Réinitialiser le message de succès
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Inscription</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <p className="text-end">
          <a href="#" className="text-primary text-decoration-none">
            Vous avez déjà un compte ?
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex gap-3">
            <div className="w-50" style={{ marginRight: '10px', textAlign: 'left' }}>
              <label htmlFor="nom" className="form-label">Nom</label>
              <input
                type="text"
                id="nom"
                className="form-control"
                placeholder="Nom"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="w-50" style={{ textAlign: 'left' }}>
              <label htmlFor="prenom" className="form-label">Prénom</label>
              <input
                type="text"
                id="prenom"
                className="form-control"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3" style={{ textAlign: 'left' }}>
            <label htmlFor="email" className="form-label">Adresse Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ textAlign: 'left' }}>
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ textAlign: 'left' }}>
            <label htmlFor="confirmPassword" className="form-label">Confirmer votre mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirmer votre mot de passe"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="text-muted small text-center">
            En vous inscrivant, vous acceptez nos{" "}
            <a href="#" className="text-primary">Conditions d'utilisation</a> et notre{" "}
            <a href="#" className="text-primary">Politique de confidentialité</a>.
          </p>
          <button type="submit" className="btn btn-primary w-100">
            Créer votre compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
