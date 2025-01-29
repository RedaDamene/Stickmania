import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TapeTaupe.css";

const TapeTaupe: React.FC = () => {
  const navigate = useNavigate();
  const [taupes, setTaupes] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [compteARebours, setCompteARebours] = useState<number | null>(null);

  useEffect(() => {
    if (gameOver) {
      setCompteARebours(3);
      return;
    }

    const interval = setInterval(() => {
      if (timeLeft > 0) {
        // Clear all taupes
        const newTaupes = Array(taupes.length).fill(0);

        // Choose one random taupe to appear
        const randomIndex = Math.floor(Math.random() * taupes.length);
        newTaupes[randomIndex] = 1;

        setTaupes(newTaupes);
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, taupes.length, gameOver]);

  // Gestion du compte à rebours et redirection
  useEffect(() => {
    if (compteARebours !== null && compteARebours > 0) {
      const timer = setTimeout(() => {
        setCompteARebours(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (compteARebours === 0) {
      navigate('/app/jeuTrouveIntru');
    }
  }, [compteARebours, navigate]);

  const handleMoleClick = (index: number) => {
    if (gameOver) return;

    if (taupes[index] === 1) {
      setScore((prevScore) => prevScore + 1);
      const newTaupes = [...taupes];
      newTaupes[index] = 0;
      setTaupes(newTaupes);

      if (score + 1 >= 9) {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleMissClick = () => {
    if (!gameOver) {
      setGameOver(true);
    }
  };

  return (
    <div className="game-container" onClick={handleMissClick}>
      <div className="game-header">
        <div className="score">Score: {score}/9</div>
        <div className="timer">Temps: {timeLeft}s</div>
      </div>

      {gameOver ? (
        <div className="game-over">
          <h2>{score >= 9 ? "Bravo ! Vous avez gagné !" : "Partie terminée !"}</h2>
          {compteARebours !== null && (
            <div className="countdown">
              Passage au jeu suivant dans {compteARebours}...
            </div>
          )}
        </div>
      ) : (
        <div className="holes">
          {taupes.map((mole, index) => (
            <div
              key={index}
              className="hole"
              onClick={(e) => {
                e.stopPropagation();
                handleMoleClick(index);
              }}
            >
              {!gameOver && mole === 1 && <div className="mole" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TapeTaupe;