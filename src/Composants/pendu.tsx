// import React from "react";

const PenduImages = ({ errors }: { errors: number }) => {
  const images = [
    "/images/pendu/pendu1.png",
    "/images/pendu/pendu2.png",
    "/images/pendu/pendu3.png",
    "/images/pendu/pendu4.png",
    "/images/pendu/pendu5.png",
    "/images/pendu/pendu6.png",
    "/images/pendu/pendu7.png",
    "/images/pendu/pendu8.png",
  ];

  return (
    <div className="flex justify-center">
      <img
        src={images[Math.min(errors, images.length - 1)]}
        alt={`Pendu étape ${errors+1}`}
        className="w-64 h-64"
      />
    </div>
  );
};

// Fonction pour obtenir un mot aléatoire
export const GetRandomWord = () => {
    const words = ["REACT", "JAVASCRIPT", "CODING", "PENDU", "TAILWIND", "FRONTEND"];
    return words[Math.floor(Math.random() * words.length)];
  };
  
  export default PenduImages;