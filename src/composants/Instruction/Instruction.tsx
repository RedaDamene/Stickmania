import React, { useState, useEffect } from "react"; // Importation des hooks React nécessaires
import "./Instruction.css"; // Importation de la feuille de styles CSS pour ce composant

// Définition du composant fonctionnel avec TypeScript (React.FC indique que c'est un composant fonctionnel)
const InstructionLightbox: React.FC = () => {
  // Déclaration de l'état pour gérer la visibilité de la lightbox
  const [isVisible, setIsVisible] = useState(true); // Par défaut, la lightbox est visible au chargement
  // Déclaration de l'état pour gérer le compte à rebours
  const [countdown, setCountdown] = useState(5); // Initialisation du compte à rebours à 5 secondes

  // Utilisation de useEffect pour gérer les effets secondaires liés au compte à rebours et à la visibilité
  useEffect(() => {
    // Création d'un intervalle qui réduit la valeur du compte à rebours chaque seconde
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1); // Décrémente la valeur précédente de `countdown` de 1
    }, 1000); // L'intervalle est défini à 1000ms (1 seconde)

    // Création d'un délai (timeout) pour masquer la lightbox après 5 secondes
    const timer = setTimeout(() => {
      setIsVisible(false); // Rend la lightbox invisible après 5 secondes
    }, 5000); // Durée du délai en millisecondes

    // Nettoyage des effets pour éviter des comportements indésirables si le composant est démonté
    return () => {
      clearTimeout(timer); // Supprime le timeout en cours
      clearInterval(interval); // Supprime l'intervalle en cours
    };
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute uniquement lors du montage du composant

  // Retourne le JSX pour afficher la lightbox
  return (
    <div
      // Applique une classe conditionnelle pour gérer l'effet de transition (fade-in ou fade-out)
      className={`lightbox-overlay ${isVisible ? "fade-in" : "fade-out"}`}
      // Désactive les interactions (comme les clics) lorsque la lightbox est masquée
      style={!isVisible ? { pointerEvents: "none" } : {}} 
    >
      <div className="lightbox-content">
        {/* Titre principal de la lightbox */}
        <h2>Instructions de Test</h2>
        {/* Zone pour ajouter des instructions spécifiques au jeu */}
        <p>Endroit pour mettre les consignes du jeu</p>
        {/* Affichage dynamique du compte à rebours */}
        <p>
          Commencement du jeu dans 
          <span className="countdown"> {countdown} </span> secondes.
        </p>
      </div>
    </div>
  );
};

export default InstructionLightbox; // Exportation du composant pour pouvoir l'utiliser dans d'autres fichiers
