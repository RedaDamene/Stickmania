import './EcranPause.css';
import { Link } from "react-router-dom";

interface EcranPauseProps {
  onClose: () => void; 
}


function EcranPause({ onClose }: EcranPauseProps) {
  return (
    <div className="modal-overlay">
        <div className="bloc">
      <button onClick={onClose}>REPRENDRE</button>
      <button >
         <Link className="button"  to="/" onClick={onClose}>QUITTER</Link>
        </button>
        </div>
    </div>
  );
}

export default EcranPause;
