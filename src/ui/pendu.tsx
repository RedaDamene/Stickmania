import { useState, useEffect } from "react";
import PenduImages, { GetRandomWord } from "../Composants/pendu";

const PenduUI = () => {
  const [errors, setErrors] = useState(0);
  const [word, setWord] = useState("");

  // Charger un mot aléatoire au démarrage
  useEffect(() => {
    setWord(GetRandomWord());
  }, []);

  const handleGuess = () => {
    setErrors((prev) => Math.min(prev + 1, 7)); // Limiter à 7 erreurs (max image 8)
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">Jeu du Pendu</h1>
      <h2 className="text-xl">Mot à deviner : {word}</h2>
      <PenduImages errors={errors} />
      <button
        onClick={handleGuess}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Ajouter une erreur
      </button>
    </div>
  );
};

export default PenduUI;
