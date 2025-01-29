import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Jeu-Morpion.css";

const JeuMorpion: React.FC = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [compteARebours, setCompteARebours] = useState<number | null>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // Gestion du compte à rebours et redirection
  useEffect(() => {
    if (compteARebours !== null && compteARebours > 0) {
      const timer = setTimeout(() => {
        setCompteARebours(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (compteARebours === 0) {
      navigate('/app/jeuClickGame');
    }
  }, [compteARebours, navigate]);

  const checkWinner = (newBoard: Array<string | null>) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const playBotMove = () => {
    if (winner || isXNext) return;

    const emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null) as number[];
    if (emptyCells.length === 0) return;

    for (let index of emptyCells) {
      const testBoard = [...board];
      testBoard[index] = "O";
      if (checkWinner(testBoard) === "O") {
        setTimeout(() => handleClick(index), 500);
        return;
      }
    }

    for (let index of emptyCells) {
      const testBoard = [...board];
      testBoard[index] = "X";
      if (checkWinner(testBoard) === "X") {
        setTimeout(() => handleClick(index), 500);
        return;
      }
    }

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setTimeout(() => handleClick(randomIndex), 500);
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setCompteARebours(3);
    } else if (!newBoard.includes(null)) {
      setWinner("Égalité");
      setCompteARebours(3);
    } else {
      setIsXNext(!isXNext);
    }
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      playBotMove();
    }
  }, [isXNext, winner]);

  return (
    <div className="morpion-container">
      <h1>Jeu du morpion (VS Bot)</h1>
      <p>{isXNext ? "C'est à vous (X)" : "Le bot joue (O)"}</p>

      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => isXNext && handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="game-over">
          <h2>
            {winner === "Égalité" 
              ? "Match nul !" 
              : winner === "X" 
                ? "Vous avez gagné !" 
                : "Le bot a gagné !"}
          </h2>
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

export default JeuMorpion;