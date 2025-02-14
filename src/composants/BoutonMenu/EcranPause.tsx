import './EcranPause.css';
import { Link } from "react-router-dom";
import React from "react";

interface EcranPauseProps {
  onClose: () => void; 
  onPauseToggle: () => void;
}

function EcranPause({ onClose, onPauseToggle }: EcranPauseProps) {
  return (
    <div className="modal-overlay">
      <div className="bloc">
        <button onClick={() => {
          onClose();
          onPauseToggle(); 
        }}>
          REPRENDRE
        </button>
        <button>
          <Link className="button" to="/" onClick={onClose}>QUITTER</Link>
        </button>
      </div>
    </div>
  );
}

export default EcranPause;
