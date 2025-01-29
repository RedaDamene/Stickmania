import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import './BoutonMenu.css';
import EcranPause from "./EcranPause";

function BoutonMenu() {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="split-button-container">
      <button onClick={() => setShowModal(true)}>
        <FiAlignJustify size={24} />
      </button>
      {showModal && <EcranPause onClose={() => setShowModal(false)}  />}
    </div>
  );
}

export default BoutonMenu;
