import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TrouveIntru.css";

const generateColor = (): string => {
  const teinte = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 20);
  const lightness = 50 + Math.floor(Math.random() * 20);
  return `hsl(${teinte}, ${saturation}%, ${lightness}%)`;
};

const TrouveIntru: React.FC = () => {
  const navigate = useNavigate();
  const [gridSize, setGridSize] = useState<number>(3);
  const [intruderIndex, setIntruderIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const [round, setRound] = useState<number>(1);
  const [baseColor, setBaseColor] = useState<string>(generateColor());
  const [intruderColor, setIntruderColor] = useState<string>(baseColor);
  const [compteARebours, setCompteARebours] = useState<number | null>(null);

  useEffect(() => {
    setIntruderIndex(Math.floor(Math.random() * gridSize * gridSize));
  }, [gridSize, round]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 && !gameOver && !gameWon ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, gameWon]);

  useEffect(() => {
    if (timer === 0 && !gameWon) {
      setGameOver(true);
      setCompteARebours(3);
    }
  }, [timer, gameWon]);

  // Gestion du compte à rebours et redirection
  useEffect(() => {
    if (compteARebours !== null && compteARebours > 0) {
      const timer = setTimeout(() => {
        setCompteARebours(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (compteARebours === 0) {
      navigate('/app/jeuMorpion');
    }
  }, [compteARebours, navigate]);

  useEffect(() => {
    const newBaseColor = generateColor();
    setBaseColor(newBaseColor);
    const lightnessAdjustment = Math.random() > 0.5 ? 10 : -10;
    setIntruderColor(newBaseColor.replace(/(\d+)%\)/, (_, p1) => `${parseInt(p1) + lightnessAdjustment}%)`));
  }, [round]);

  const handleClick = (index: number): void => {
    if (index === intruderIndex) {
      if (round < 4) {
        setGridSize((prev) => prev + 1);
        setRound((prev) => prev + 1);
        setTimer(5); // Reset timer for next round
      } else {
        setGameWon(true);
        setCompteARebours(3);
      }
    } else {
      setGameOver(true);
      setCompteARebours(3);
    }
  };

  return (
    <div className="trouve-intru-container">
      <div className="game-title">Trouve l'Intru</div>
      
      <div className="game-header">
        <div className="round">Niveau: {round}/4</div>
        <div className="timer">Temps: {timer}s</div>
      </div>

      {!gameOver && !gameWon ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            maxWidth: `${gridSize * 100}px`
          }}
        >
          {[...Array(gridSize * gridSize)].map((_, index) => (
            <button
              key={index}
              className="color-button"
              style={{
                backgroundColor: index === intruderIndex ? intruderColor : baseColor
              }}
              onClick={() => handleClick(index)}
            ></button>
          ))}
        </div>
      ) : (
        <div className="game-over">
          <h2>{gameWon ? "Bravo ! Vous avez gagné !" : "Partie terminée !"}</h2>
          {compteARebours !== null && (
            <div className="countdown">
              Passage au jeu suivant dans {compteARebours}...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrouveIntru;