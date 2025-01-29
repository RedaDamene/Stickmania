import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClickGame.css';

export default function ClickGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setGameOver(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      const timeoutId = window.setTimeout(() => {
        navigate('/app/jeuClicCouleur');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [gameOver, navigate]);

  const handleClick = () => {
    if (!gameOver) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="click-game-container">
      <h1 className="click-game-title">Jeu du Clique-Rapide</h1>
      {!gameOver ? (
        <>
          <p className="click-game-stats">Temps restant : {timeLeft}s</p>
          <p className="click-game-stats">Score : {score}</p>
          <button className="click-game-button" onClick={handleClick}>
            Clique ici !
          </button>
        </>
      ) : (
        <>
          <p className="click-game-end">Fin du jeu !</p>
          <p className="click-game-stats">Votre score : {score}</p>
          <p className="click-game-redirect">
            Redirection vers le jeu suivant dans 5 secondes...
          </p>
        </>
      )}
    </div>
  );
}