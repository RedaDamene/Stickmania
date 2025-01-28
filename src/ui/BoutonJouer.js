import React from "react";

const PlayButton = () => {
  // Gestion des styles et comportement
  const buttonStyle =
    "bg-green-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95";

  return (
    // Structure HTML
    <div>
        <button className={buttonStyle}>
        Jouer
        </button>
    </div>

  );
};

export default PlayButton;
