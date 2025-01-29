import React, { useState, useEffect, useRef } from 'react';
import './ClickGame.css';

export default function ClickGame() {
  // \"score\" stocke le nombre de clics réalisés par le joueur
  const [score, setScore] = useState(0);
  // \"timeLeft\" stocke le temps restant (en secondes)
  const [timeLeft, setTimeLeft] = useState(15);
  // \"gameOver\" indique si la partie est terminée ou non
  const [gameOver, setGameOver] = useState(false);
  // Permet de savoir si le joueur peut appuyer sur \"Rejouer\" ou non
  const [canRestart, setCanRestart] = useState(false);

  // \"intervalRef\" sert à stocker la référence du setInterval pour le nettoyage
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Démarre le compte à rebours via un setInterval toutes les 1000ms (1 seconde)
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

    // Nettoyage : on arrête le setInterval si le composant est démonté
    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Surveille quand la partie est terminée : après 5s, autorise le Rejouer
  useEffect(() => {
    if (gameOver) {
      // Désactive le bouton dès que la partie est terminée
      setCanRestart(false);
      // Active le bouton \"Rejouer\" au bout de 5 secondes
      const timeoutId = window.setTimeout(() => {
        setCanRestart(true);
      }, 5000);

      // Nettoyage si le composant est démonté pendant le délai
      return () => clearTimeout(timeoutId);
    }
  }, [gameOver]);

  // Incrémentation du score uniquement si le jeu n'est pas encore terminé
  const handleClick = () => {
    if (!gameOver) {
      setScore((prev) => prev + 1);
    }
  };

  // Fonction de remise à zéro du jeu
  const handleRestart = () => {
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (intervalRef.current !== undefined) {
            clearInterval(intervalRef.current);
          }
          setGameOver(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
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

          {/* Bouton Rejouer désactivé pendant 5 secondes après la fin de la partie */}
          <button 
            className="click-game-button" 
            onClick={handleRestart}
            disabled={!canRestart}
          >
            {canRestart ? 'Rejouer' : 'Patientez...'}
          </button>
        </>
      )}
    </div>
  );
}
