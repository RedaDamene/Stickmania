import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PageFin.css";

const PageFin: React.FC = () => {
  const location = useLocation();
  const score = location.state?.score || 0;
  const navigate = useNavigate();

  const handleRejouer = () => {
    navigate("/");
  };

  return (
    <div className="page-fin-container">
      <h1 className="page-fin-titre">Merci d'avoir joué !</h1>
      <p className="page-fin-score">Votre score total : {score}</p>
      <button className="page-fin-bouton" onClick={handleRejouer}>
        Rejouer
      </button>
    </div>
  );
};

export default PageFin;