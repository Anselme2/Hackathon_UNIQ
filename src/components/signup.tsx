import React from "react";

const SignUp: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Inscription</h3>
        <p className="text-end">
          <a href="#" className="text-primary text-decoration-none">
            Vous avez déjà un compte ?
          </a>
        </p>
        <form>
          <div className="mb-3 d-flex gap-3">
            <div className="w-50" style={{marginRight:'10px', textAlign:'left'}}>
              <label htmlFor="nom" className="form-label">Nom</label>
              <input type="text" id="nom" className="form-control" placeholder="Nom" required />
            </div>
            <div className="w-50" style={{textAlign:'left'}}>
              <label htmlFor="prenom" className="form-label">Prénom</label>
              <input type="text" id="prenom" className="form-control" placeholder="Prénom" />
            </div>
          </div>
          <div className="mb-3" style={{textAlign:'left'}}>
            <label htmlFor="email" className="form-label">Adresse Email</label>
            <input type="email" id="email" className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3" style={{textAlign:'left'}}>
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" id="password" className="form-control" placeholder="Mot de passe" required />
          </div>
          <div className="mb-3" style={{textAlign:'left'}}>
            <label htmlFor="confirmPassword" className="form-label">Confirmer votre mot de passe</label>
            <input type="password" id="confirmPassword" className="form-control" placeholder="Confirmer votre mot de passe" required />
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
