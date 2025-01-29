import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./JeuDuClavier.css";

const JeuDuClavier: React.FC = () => {
  const navigate = useNavigate();

  const retourAccueil = () => {
    navigate("/"); // Redirige vers la route d'accueil
  };

  // Liste des mots à taper (20 mots)
  const mots = [
    "chocolat", "ordinateur", "react", "typescript", "jeu", "clavier",
    "écran", "javascript", "programmer", "code", "développeur", "projet",
    "interface", "application", "design", "efficacité", "innovation",
    "créativité", "solution", "performance"
  ];

  // Fonction pour mélanger un tableau aléatoirement
  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // États du jeu
  const [shuffledWords, setShuffledWords] = useState<string[]>([]); // Liste mélangée de mots
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Mot actuel
  const [userInput, setUserInput] = useState(""); // Ce que l'utilisateur tape
  const [isGameOver, setIsGameOver] = useState(false); // Si la partie est terminée
  const [timer, setTimer] = useState(60); // Compteur de temps (60 secondes)
  const [lives, setLives] = useState(3); // Nombre de vies (3 par défaut)
  const [showLightbox, setShowLightbox] = useState(false); // Affichage de la boîte "Perdu"

  // Référence pour l'input, permet de garder le focus
  const inputRef = useRef<HTMLInputElement>(null);

  // 🔹 Mélanger les mots au début du jeu
  useEffect(() => {
    setShuffledWords(shuffleArray(mots)); // Mélange la liste des mots au démarrage
  }, []);

  // 🔹 Gestion du compteur de temps
  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000); // Décrémente le timer chaque seconde
      return () => clearInterval(interval); // Nettoie l'intervalle pour éviter les bugs
    } else if (timer === 0) {
      setIsGameOver(true); // Si le temps atteint 0, la partie est perdue
      setShowLightbox(true); // Affiche la boîte "Perdu"
    }
  }, [timer, isGameOver]);

  // 🔹 Forcer le focus sur l'input à chaque mise à jour du jeu
  useEffect(() => {
    const focusInput = () => {
      if (!isGameOver && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus(); // Garde le focus sur l'input
        }, 50); // Délai court pour éviter les bugs
      }
    };

    focusInput(); // Focus au démarrage
    document.addEventListener("click", focusInput); // Reprend le focus si on clique ailleurs

    return () => {
      document.removeEventListener("click", focusInput); // Nettoie l'event listener
    };
  }, [isGameOver, currentWordIndex]);

  // 🔹 Gère la saisie de l'utilisateur
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    // Vérifie si le mot tapé correspond au mot actuel
    if (value === shuffledWords[currentWordIndex]) {
      setUserInput(""); // Efface l'input
      setCurrentWordIndex((prev) => prev + 1); // Passe au mot suivant

      // Vérifie si c'était le dernier mot de la liste
      if (currentWordIndex === shuffledWords.length - 1) {
        setIsGameOver(true); // Fin du jeu (victoire)
      }
    }
    // Vérifie si l'utilisateur a fait une erreur
    else if (!shuffledWords[currentWordIndex].startsWith(value)) {
      setLives((prev) => prev - 1); // Réduit le nombre de vies
      setUserInput(""); // Efface l'input

      // Si l'utilisateur n'a plus de vies, il perd
      if (lives - 1 === 0) {
        setIsGameOver(true);
        setShowLightbox(true);
      }
    }
  };

  // 🔹 Fonction pour redémarrer le jeu
  const restartGame = () => {
    setShuffledWords(shuffleArray(mots)); // Mélange les mots à nouveau
    setCurrentWordIndex(0); // Recommence depuis le premier mot
    setUserInput(""); // Vide l'input
    setIsGameOver(false); // Réinitialise l'état du jeu
    setTimer(60); // Remet le temps à 60 secondes
    setLives(3); // Rétablit les vies à 3
    setShowLightbox(false); // Cache la boîte "Perdu"
    if (inputRef.current) inputRef.current.focus(); // Remet le focus sur l'input
  };

  return (
    <div className="background-container">
      <div className="jeu-container">
        {/* Affichage de la boîte "Vous avez perdu" */}
        {showLightbox ? (
          <div className="lightbox">
            <h2>Vous avez perdu !</h2>
            <button onClick={retourAccueil}>Jeu suivant</button>
          </div>
        ) : isGameOver ? (
          // Affichage de l'écran de fin (victoire ou défaite)
          <div className="game-over">
            <h2>{currentWordIndex === shuffledWords.length ? "Félicitations, vous avez gagné !" : "Perdu !"}</h2>
            <button onClick={retourAccueil}>Jeu suivant</button>
          </div>
        ) : (
          // Affichage du jeu en cours
          <div className="game">
            <h1>Jeu du clavier (20 mots)</h1>
            <p className="timer">Temps restant : {timer} secondes</p>
            <p className="lives">Vies restantes : ❤️ {lives}</p>
            <p className="word">
              Mot à écrire : <span>{shuffledWords[currentWordIndex]}</span>
            </p>
            <p className="progress">Mot {currentWordIndex + 1} / {shuffledWords.length}</p>
            <input
              ref={inputRef} // Associe l'input à la référence pour le focus
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
