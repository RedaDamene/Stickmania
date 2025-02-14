import { Link } from "react-router-dom";
import React from "react";
function BoutonJouer () {
  return (
    <>
      <Link to="/app/jeuTiming">
        <button className="">
          <img src="/images/BoutonJouer.png" alt="Jouer" />
        </button>
      </Link>
    </>
  );
};

export default BoutonJouer;