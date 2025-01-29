// PagePrincipale.js
import React from "react";
import "./PagePrincipale.css";
// import imageSrc from "/images/Stickmania_1.png"; 
import BoutonJouer from "../ui/BoutonJouer";

function PagePrincipale() {
  return (
    <div className="container">
      <div className="bouton">
      <BoutonJouer/>
      </div>
      
    </div>
  );
}

export default PagePrincipale;
