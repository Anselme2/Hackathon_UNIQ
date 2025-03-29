import React from "react";


const LoginPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Connexion </h3>
        <form>
          <div className="mb-3" style={{textAlign:'left'}}>
            <label htmlFor="email" className="form-label text-start" >Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" />
          </div>
          <div className="mb-3" style={{textAlign:'left'}} >
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Mot de passe" />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" id="keepSignedIn" className="form-check-input me-2" />
              <label htmlFor="keepSignedIn" className="form-check-label">Souvenir de moi</label>
            </div>
            <a href="#" className="text-primary">Mot de passe oublie?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <a href="#" className="text-primary">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
