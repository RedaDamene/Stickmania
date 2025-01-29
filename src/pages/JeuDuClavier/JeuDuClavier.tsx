import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./JeuDuClavier.css";

const JeuDuClavier: React.FC = () => {
  const navigate = useNavigate();
  const [compteARebours, setCompteARebours] = useState<number | null>(null);

  const mots = [
    "chocolat", "ordinateur", "react", "typescript", "jeu", "clavier",
    "écran", "javascript", "programmer", "code", "développeur", "projet",
    "interface", "application", "design", "efficacité", "innovation",
    "créativité", "solution", "performance"
  ];

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(60);
  const [lives, setLives] = useState(3);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShuffledWords(shuffleArray(mots));
  }, []);

  // Gestion du compte à rebours et redirection
  useEffect(() => {
    if (compteARebours !== null && compteARebours > 0) {
      const timer = setTimeout(() => {
        setCompteARebours(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (compteARebours === 0) {
      navigate('/app/ProchainJeu'); // Remplacer par la route du prochain jeu
    }
  }, [compteARebours, navigate]);

  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsGameOver(true);
      setCompteARebours(3);
    }
  }, [timer, isGameOver]);

  useEffect(() => {
    const focusInput = () => {
      if (!isGameOver && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }
    };

    focusInput();
    document.addEventListener("click", focusInput);

    return () => {
      document.removeEventListener("click", focusInput);
    };
  }, [isGameOver, currentWordIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value === shuffledWords[currentWordIndex]) {
      setUserInput("");
      setCurrentWordIndex((prev) => prev + 1);

      if (currentWordIndex === shuffledWords.length - 1) {
        setIsGameOver(true);
        setCompteARebours(3);
      }
    } else if (!shuffledWords[currentWordIndex].startsWith(value)) {
      setLives((prev) => prev - 1);
      setUserInput("");

      if (lives - 1 === 0) {
        setIsGameOver(true);
        setCompteARebours(3);
      }
    }
  };

  return (
    <div className="background-container">
      <div className="jeu-container">
        {isGameOver ? (
          <div className="game-over">
            <h2>
              {currentWordIndex === shuffledWords.length 
                ? "Félicitations, vous avez gagné !" 
                : "Vous avez perdu !"}
            </h2>
            {compteARebours !== null && (
              <div className="countdown">
                Passage au jeu suivant dans {compteARebours}...
              </div>
            )}
          </div>
        ) : (
          <div className="game">
            <h1>Jeu du clavier (20 mots)</h1>
            <p className="timer">Temps restant : {timer} secondes</p>
            <p className="lives">Vies restantes : ❤️ {lives}</p>
            <p className="word">
              Mot à écrire : <span>{shuffledWords[currentWordIndex]}</span>
            </p>
            <p className="progress">Mot {currentWordIndex + 1} / {shuffledWords.length}</p>
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