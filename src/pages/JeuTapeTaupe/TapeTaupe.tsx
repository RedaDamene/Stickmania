import React, { useState, useEffect } from "react";
import "./TapeTaupe.css";

const TapeTaupe: React.FC = () => {
  const [taupes, setTaupes] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return; // Stop updating when the game is over

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
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, taupes.length, gameOver]);

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
      {gameOver && <p>{score >= 9 ? "Win!" : "Game Over!"}</p>}
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
    </div>
  );
};

export default TapeTaupe;