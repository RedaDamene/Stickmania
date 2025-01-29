import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import './BoutonMenu.css';
import EcranPause from "./EcranPause";

interface BoutonMenuProps {
  onPauseToggle: () => void; 
}

function BoutonMenu({ onPauseToggle }: BoutonMenuProps) { // Récupère la fonction en prop

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="split-button-container">
      <button onClick={() => {
        setShowModal(true);
        onPauseToggle(); // Met en pause le chrono
      }}>
        <FiAlignJustify size={24} />
      </button>
      {showModal && <EcranPause onClose={() => setShowModal(false)} onPauseToggle={onPauseToggle} />}
    </div>
  );
}

export default BoutonMenu;
