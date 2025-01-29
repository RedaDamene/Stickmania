import {useState} from "react";
import BoutonMenu from "./BoutonMenu";
import EcranPause from "./EcranPause";

function Ecran1() {

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <BoutonMenu />
      <h2>Bienvenue sur l'Écran 1</h2>
      <p>Ceci est l'écran 1.</p>
      <button onClick={() => setShowModal(true)}>Test</button>
      {showModal && <EcranPause onClose={() => setShowModal(false)}  />}
    </div>
  );
}

export default Ecran1;
