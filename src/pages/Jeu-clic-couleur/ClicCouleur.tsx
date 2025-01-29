import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ClicCouleur.css";

const ClicCouleur: React.FC = () => {
  const [score, setScore] = useState(0);
  const [chrono, setChrono] = useState(15);
  const [couleurCible, setCouleurCible] = useState("bleu");
  const [jeuTerminé, setJeuTerminé] = useState(false);
  const navigate = useNavigate();

  const couleursPossibles = [
    { nom: "Bleu", code: "blue" },
    { nom: "Rouge", code: "red" },
    { nom: "Vert", code: "green" },
    { nom: "Jaune", code: "yellow" },
    { nom: "Violet", code: "purple" },
  ];

  const genererCercles = () => {
    const cercles = Array.from({ length: 5 }).map(() => {
      const couleur =
        couleursPossibles[Math.floor(Math.random() * couleursPossibles.length)];
      return {
        id: Math.random().toString(36).substring(2, 9),
        couleur: couleur.code,
        nomCouleur: couleur.nom,
        position: {
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        },
      };
    });

    const couleurCible = cercles[Math.floor(Math.random() * cercles.length)];
    setCouleurCible(couleurCible.nomCouleur);

    return cercles;
  };

  const [cercles, setCercles] = useState(genererCercles);

  const handleClic = (nomCouleur: string) => {
    if (nomCouleur === couleurCible) {
      setScore((prev) => prev + 1);
      setCercles(genererCercles);
    } else {
      setCercles(genererCercles);
    }
  };

  useEffect(() => {
    if (jeuTerminé) return;

    const interval = setInterval(() => {
      setChrono((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setJeuTerminé(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [jeuTerminé]);

  useEffect(() => {
    if (jeuTerminé) {
      navigate("/app/PageFin", { state: { score } });
    }
  }, [jeuTerminé, navigate, score]);

  return (
    <div className="jeu-container full-screen">
      {!jeuTerminé ? (
        <>
          <h1 className="titre">Clique sur le cercle correspondant !</h1>
          <p className="info">Score : {score}</p>
          <p className="info">Temps restant : {chrono}s</p>
          <p className="info">
            Couleur cible :{" "}
            <span
              style={{
                backgroundColor: couleursPossibles.find(
                  (c) => c.nom === couleurCible
                )?.code,
                color: "white",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              {couleurCible}
            </span>
          </p>
          <div className="cercles-container">
            {cercles.map((cercle) => (
              <motion.div
                key={cercle.id}
                style={{
                  ...cercle.position,
                  backgroundColor: cercle.couleur,
                }}
                className="cercle"
                onClick={() => handleClic(cercle.nomCouleur)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              ></motion.div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ClicCouleur;