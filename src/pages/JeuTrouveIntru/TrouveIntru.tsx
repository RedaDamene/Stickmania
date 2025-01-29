import React, { useState, useEffect } from "react";
import "./TrouveIntru.css";

const generateColor = (): string => {
  const teinte = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 20);
  const lightness = 50 + Math.floor(Math.random() * 20);
  return `hsl(${teinte}, ${saturation}%, ${lightness}%)`;
};

const TrouveIntru: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(3);
  const [intruderIndex, setIntruderIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const [round, setRound] = useState<number>(1);
  const [baseColor, setBaseColor] = useState<string>(generateColor());
  const [intruderColor, setIntruderColor] = useState<string>(baseColor);

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
    }
  }, [timer, gameWon]);

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
      } else {
        setGameWon(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = (): void => {
    setGridSize(3);
    setGameOver(false);
    setGameWon(false);
    setRound(1);
    setTimer(5);
    setBaseColor(generateColor());
  };

  return (
    <div className="trouveIntru">
      {!gameOver && !gameWon ? (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 80px)` }}
        >
          {[...Array(gridSize * gridSize)].map((_, index) => (
            <button
              key={index}
              style={{ backgroundColor: index === intruderIndex ? intruderColor : baseColor }}
              onClick={() => handleClick(index)}
            ></button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2>{gameWon ? "Bravo, vous avez gagné!" : "Game Over!"}</h2>
          <button onClick={restartGame}>
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
};

export default TrouveIntru;