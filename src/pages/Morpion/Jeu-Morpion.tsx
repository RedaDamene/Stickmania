import React, { useState, useEffect } from "react";
import "./Jeu-Morpion.css";

const JeuMorpion: React.FC = () => {
  // 🎯 État du plateau : tableau de 9 cases initialement vides (null)
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));

  // 🔄 Détermine quel joueur doit jouer : true = Joueur X, false = Bot O
  const [isXNext, setIsXNext] = useState(true);

  // 🏆 Stocke le gagnant ou null si personne n'a encore gagné
  const [winner, setWinner] = useState<string | null>(null);

  // 🎯 Liste des combinaisons gagnantes (3 en ligne, colonne ou diagonale)
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes verticales
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  // ✅ Vérifie s'il y a un gagnant dans le tableau actuel
  const checkWinner = (newBoard: Array<string | null>) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]; // Retourne "X" ou "O" si victoire
      }
    }
    return null; // Pas de gagnant
  };

  // 🤖 Fonction qui fait jouer le bot (O)
  const playBotMove = () => {
    if (winner || isXNext) return; // Vérifie que ce soit bien le tour du bot et que le jeu ne soit pas fini

    // 🧐 Trouve toutes les cases vides disponibles
    const emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null) as number[];

    if (emptyCells.length === 0) return; // Si plus de cases vides, le jeu est terminé

    // 🏆 1️⃣ Le bot vérifie s'il peut gagner immédiatement
    for (let index of emptyCells) {
      const testBoard = [...board];
      testBoard[index] = "O"; // Simule un coup du bot
      if (checkWinner(testBoard) === "O") {
        setTimeout(() => handleClick(index), 500); // Joue immédiatement pour gagner
        return;
      }
    }

    // 🛑 2️⃣ Le bot bloque le joueur si celui-ci est sur le point de gagner
    for (let index of emptyCells) {
      const testBoard = [...board];
      testBoard[index] = "X"; // Simule un coup du joueur
      if (checkWinner(testBoard) === "X") {
        setTimeout(() => handleClick(index), 500); // Bloque immédiatement
        return;
      }
    }

    // 🤷‍♂️ 3️⃣ Sinon, joue une case au hasard
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setTimeout(() => handleClick(randomIndex), 500);
  };

  // 🎮 Fonction exécutée lorsqu'un joueur clique sur une case
  const handleClick = (index: number) => {
    if (board[index] || winner) return; // Empêche de jouer sur une case déjà occupée ou si le jeu est terminé

    const newBoard = [...board]; // Copie du plateau actuel
    newBoard[index] = isXNext ? "X" : "O"; // Place X (joueur) ou O (bot)
    setBoard(newBoard); // Met à jour l'état du plateau

    // 🏆 Vérifie s'il y a un gagnant après le coup
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner); // Définit le gagnant (X ou O)
    } else if (!newBoard.includes(null)) {
      setWinner("Égalité"); // Si toutes les cases sont remplies sans gagnant, c'est un match nul
    } else {
      setIsXNext(!isXNext); // Change de joueur
    }
  };

  // ⚡ Exécute automatiquement le coup du bot après le tour du joueur
  useEffect(() => {
    if (!isXNext && !winner) {
      playBotMove();
    }
  }, [isXNext, winner]);

  // 🔄 Réinitialisation du jeu
  const restartGame = () => {
    setBoard(Array(9).fill(null)); // Réinitialise le plateau vide
    setIsXNext(true); // Toujours le joueur X qui commence
    setWinner(null); // Supprime le gagnant pour recommencer
  };

  return (
    <div className="morpion-container">
      <h1>Jeu du morpion (VS Bot)</h1>
      <p>{isXNext ? "C'est à vous (X)" : "Le bot joue (O)"}</p>

      {/* 🎯 Affichage du plateau */}
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => isXNext && handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>

      {/* 🎉 Affichage du message de victoire ou d'égalité */}
      {winner && (
        <div className="game-over">
          <h2>{winner === "Égalité" ? "Match nul !" : winner === "X" ? "Vous avez gagné !" : "Le bot a gagné !"}</h2>
          <button onClick={restartGame}>Jeu suivant</button>
        </div>
      )}
    </div>
  );
};

export default JeuMorpion;
