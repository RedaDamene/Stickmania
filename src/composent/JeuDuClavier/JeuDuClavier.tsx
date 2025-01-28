import React, { useState, useEffect, useRef } from "react";
import "./JeuDuClavier.css";
import backgroundImg from "../../assets/Stickmania.png";

const JeuDuClavier: React.FC = () => {
  const mots = [
    "chocolat", "ordinateur", "react", "typescript", "jeu", "clavier",
    "écran", "javascript", "programmer", "code", "développeur", "projet",
    "interface", "application", "design", "efficacité", "innovation",
    "créativité", "solution", "performance"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(60);
  const [lives, setLives] = useState(3);
  const [showLightbox, setShowLightbox] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsGameOver(true);
      setShowLightbox(true);
    }
  }, [timer, isGameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value === mots[currentWordIndex]) {
      setUserInput("");
      setCurrentWordIndex((prev) => prev + 1);

      if (currentWordIndex === mots.length - 1) {
        setIsGameOver(true);
      }
    } else if (!mots[currentWordIndex].startsWith(value)) {
      setLives((prev) => prev - 1);
      setUserInput("");

      if (lives - 1 === 0) {
        setIsGameOver(true);
        setShowLightbox(true);
      }
    }
  };

  const restartGame = () => {
    setCurrentWordIndex(0);
    setUserInput("");
    setIsGameOver(false);
    setTimer(60);
    setLives(3);
    setShowLightbox(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="background-container"> {/* Ajout du fond pleine page */}
      <div className="jeu-container">
        {showLightbox ? (
          <div className="lightbox">
            <h2>Vous avez perdu !</h2>
            <p>Essayez encore.</p>
            <button onClick={restartGame}>Jeu suivant</button>
          </div>
        ) : isGameOver ? (
          <div className="game-over">
            <h2>{currentWordIndex === mots.length ? "Félicitations, vous avez gagné !" : "Perdu !"}</h2>
            <button onClick={restartGame}>Rejouer</button>
          </div>
        ) : (
          <div className="game">
            <h1>Jeu du clavier</h1>
            <p className="timer">Temps restant : {timer} secondes</p>
            <p className="lives">Vies restantes : ❤️ {lives}</p>
            <p className="word">
              Mot à écrire : <span>{mots[currentWordIndex]}</span>
            </p>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="input-box"
              placeholder="Tapez ici..."
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JeuDuClavier;
