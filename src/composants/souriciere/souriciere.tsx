import React, { useState, useRef } from "react";
import './souriciere.css'; 

interface LabyrintheProps {
  statut: (statut: string) => void;
}

const Labyrinthe = (props : LabyrintheProps) => {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);
  const mazeRef = useRef(null);
  const cursorRef = useRef(null); // Référence pour le curseur virtuel

  const startGame = () => {
    setStarted(true);
    setGameOver(false);
    setCompleted(false);
    
    // Téléportation du curseur à la position de départ
    if (cursorRef.current) {
      cursorRef.current.style.top = "50px"; // Position de départ sur le labyrinthe
      cursorRef.current.style.left = "50px"; // Position de départ sur le labyrinthe
    }
  };

  const handleMouseMove = (e) => {
    if (!started || gameOver || completed) {
      if (gameOver){
        console.log("Perdu");
        props.statut("perdu");
      } else if (completed){
        props.statut("gagne");
      }
    };

    const cursor = e.target;

    if (cursor.classList.contains("wall")) {
      setGameOver(true); // Le joueur touche un mur, le jeu est terminé
    } else if (cursor.classList.contains("end")) {
      setCompleted(true); // Le joueur atteint la fin, le jeu est complété
    }

    // Met à jour la position du curseur virtuel
    if (cursorRef.current) {
      const mazeRect = mazeRef.current.getBoundingClientRect();
      const mouseX = e.clientX - mazeRect.left;
      const mouseY = e.clientY - mazeRect.top;

      // Limiter la position du curseur virtuel aux limites du labyrinthe
      cursorRef.current.style.left = `${Math.min(mazeRect.width - 30, Math.max(0, mouseX))}px`;
      cursorRef.current.style.top = `${Math.min(mazeRect.height - 30, Math.max(0, mouseY))}px`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">

      {!started && !gameOver && !completed && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-green-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-green-600"
        >
          Démarrer le Jeu
        </button>
      )}

      {gameOver && (
        <div className="text-red-500 text-2xl font-bold mb-4">
          Vous avez perdu ! 😢
        </div>
      )}

      {completed && (
        <div className="text-green-500 text-2xl font-bold mb-4">
          Félicitations ! 🎉
        </div>
      )}

      {started && (
        <div
          ref={mazeRef}
          onMouseMove={handleMouseMove}
          className="relative w-[400px] h-[400px] bg-white border-4 border-blue-700 rounded-md shadow-xl mt-6"
        >
          <div className="relative">
            {/* Murs */}
            <div
              className="wall absolute bg-blue-700 rounded-sm"
              style={{ top: "50px", left: "0px", width: "1050px", height: "20px", position: "relative" }}
            ></div>

            <div
              className="wall absolute bg-blue-700 rounded-sm"
              style={{ top: "50px", left: "0px", width: "20px", height: "75px", position: "relative" }}
            ></div>

            <div
              className="wall absolute bg-blue-700 rounded-sm"
              style={{ top: "29px", left: "20px", width: "1000px", height: "20px", position: "relative" }}
            ></div>

            {/* Mur vertical à droite */}
            <div
              className="wall absolute bg-blue-700 rounded-sm"
              style={{
                top: "-66px",
                left: "1050px",
                width: "20px",
                height: "150px",
                position: "relative",
              }}
            ></div>

            <div
              className="wall absolute bg-blue-700 rounded-sm"
              style={{
                top: "-85px",
                left: "0px",
                width: "1050px",
                height: "20px",
                position: "relative",
              }}
            ></div>
          </div>

          {/* Point de Fin */}
          <div
            className="end absolute bg-yellow-500 rounded-full border-2 border-yellow-700"
            style={{
              bottom: "202px",
              right: "-30px",
              width: "30px",
              height: "30px",
              position: "relative",
            }}
          ></div>



        </div>
      )}
    </div>
  );
};

export default Labyrinthe;
