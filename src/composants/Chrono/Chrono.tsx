import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chrono.css";

interface ChronoProps {
  tempsDeJeu: number; // Temps initial du chrono
  reussite: boolean; // Indique si la réussite a été atteinte
  pause: boolean;
}

const Chrono: React.FC<ChronoProps> = ({ tempsDeJeu, reussite, pause }) => {
  const [chrono, setChrono] = useState<number>(tempsDeJeu); // Initialise le chrono avec la valeur passée
  const navigate = useNavigate();

  // Gestion du timer
  useEffect(() => {

    if (reussite) {
      setChrono(tempsDeJeu); // Réinitialise le chrono en cas de réussite
      return;
    }
    console.log("JE SUIS LA")
    if(!pause) {
      console.log("ICI AUSSI")
      if (chrono > 0) {
        const interval = setInterval(() => {
          setChrono((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // Nettoie l'intervalle
      }
    }

    if (chrono === 0) {
      navigate("/"); // Redirige si le chrono atteint 0
    }
  }, [chrono, reussite, navigate, tempsDeJeu, pause]);

  return (
    <div className="Class_Chrono_fond">
      <div className="Class_Text_Gauche">
        Temps
        Restant
      </div>
      <div className="Class_Chrono_Droit">
        <h3>{chrono}</h3>
      </div>
    </div>
  );
};

export default Chrono;
