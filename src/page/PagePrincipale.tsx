// PagePrincipale.js
import React from "react";
import "./PagePrincipale.css";
import imageSrc from "../assets/images/Stickmania_1.png"; 

function PagePrincipale() {
  return (
    <div className="App">
      <div>
        <img src={imageSrc} alt="menu principal" />
      </div>
      <div>
      </div>
    </div>
  );
}

export default PagePrincipale;
