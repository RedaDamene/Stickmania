import { useState, useEffect } from "react";
import PenduImages, { GetRandomWord } from "../Composants/pendu";
import "./pendu.css"; // Import du fichier CSS

const PenduUI = () => {
  const [errors, setErrors] = useState(0);
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const newWord = GetRandomWord();
    setWord(newWord);
    setGuessedLetters([]);
    setErrors(0);
    setGameWon(false);
    setGameOver(false);
  }, []);

  useEffect(() => {
    if (guessedLetters.length > 0 && word.split("").every((letter) => guessedLetters.includes(letter))) {
      setGameWon(true);
    }
  }, [guessedLetters, word]);

  useEffect(() => {
    if (errors >= 7) {
      setGameOver(true);
    }
  }, [errors]);

  const handleGuess = () => {
    if (!inputValue || gameOver || gameWon) return;

    const normalizedInput = inputValue.toUpperCase();
    
    if (normalizedInput.length === 1) {
      if (word.includes(normalizedInput)) {
        setGuessedLetters((prev) => [...prev, normalizedInput]);
      } else {
        setErrors((prev) => prev + 1);
      }
    } else {
      if (normalizedInput === word) {
        setGameWon(true);
      } else {
        setErrors((prev) => prev + 1);
      }
    }

    setInputValue("");
  };

  return (
    <div className="BackgroundPendu flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-white">Jeu du Pendu</h1>
      <h2 className="text-xl text-white">
        Mot à deviner :{" "}
        {gameWon ? word : word.split("").map((letter) => (guessedLetters.includes(letter) ? letter : "_")).join(" ")}
      </h2>

      <PenduImages errors={errors} />

      {!gameOver && !gameWon && (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            maxLength={word.length}
            className="px-4 py-2 border rounded text-black"
            placeholder="Entrer une lettre ou un mot"
          />

          <button
            onClick={handleGuess}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Valider
          </button>

          <p className="text-white">Erreurs : {errors}/7</p>
        </>
      )}

      {gameWon && <p className="text-green-500 text-xl font-bold">🎉 Bravo ! Tu as trouvé le mot !</p>}
      {gameOver && <p className="text-red-500 text-xl font-bold">💀 Perdu ! Le mot était : {word}</p>}
    </div>
  );
};

export default PenduUI;