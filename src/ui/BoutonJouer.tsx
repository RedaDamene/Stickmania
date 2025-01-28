import { Link } from "react-router-dom";
import "./BoutonJouer.css"; // Chemin corrigé pour le fichier CSS

function BoutonJouer () {
  return (
    <>
      <Link to="/Jeux1">
        <button className="">
          <img src="/images/BoutonJouer.png" alt="Jouer" />
        </button>
      </Link>
    </>
  );
};

export default BoutonJouer;
