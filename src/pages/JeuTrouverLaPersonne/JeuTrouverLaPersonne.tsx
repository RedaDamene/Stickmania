import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JeuTrouverLaPersonne.css";
import Chrono from "../../composants/Chrono/Chrono";

const JeuTrouverLaPersonne: React.FC = () => {
  const navigate = useNavigate();
  const [nomActuel, setNomActuel] = useState<string>(""); // Nom à trouver
  const [motLettre, setMotLettre] = useState<string>(""); // Mot saisi
  const [motStocke, setMotStocke] = useState<string>(""); // Mot stocké quand Entrée est pressée
  const [jeuReussi, setJeuReussi] = useState<boolean>(false); // Statut du jeu (réussi ou non)
  const [comparaison, setComparaison] = useState<string>(""); // Message de comparaison (trop bas ou trop haut)
  const [pause, setPause] = useState<boolean>(false); // Nouvel état pour la pause

  // Liste des prénoms
  const prenoms = [
    "Martin", "Tom", "Jonathan", "Aimen", "Alexis", "Victor",
    "Mathis", "Audrey", "Evan", "Brice", "Constant",
    "Nathanaël", "Enzo", "Nathan", "Julien", "Erika", "Jules",
    "Souvanny", "Léo", "Marius", "Réda", "Loucas"
  ];

  // Fonction pour choisir un prénom aléatoire
  const choisirNomAleatoire = () => {
    const nom = prenoms[Math.floor(Math.random() * prenoms.length)];
    console.log(nom);
    setNomActuel(nom);
    setJeuReussi(false); // Réinitialiser le statut du jeu à non réussi au nouveau prénom
    setComparaison(""); // Réinitialiser le message de comparaison
  };

  // Gestion de la modification du champ de texte
  const gererChangement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotLettre(`${e.target.value}`);
  };

  // Fonction pour gérer l'événement de la touche "Entrée"
  const gererTouche = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Quand l'utilisateur appuie sur "Entrée", on stocke le mot dans "motStocke"
      setMotStocke(motLettre);
      console.log("Mot stocké : ", motLettre);
      
      // Vérification si le mot saisi correspond au nom à trouver
      if (motLettre.toLowerCase() === nomActuel.toLowerCase()) {
        setJeuReussi(true); // Le jeu est réussi
        setComparaison(""); // Réinitialiser le message
      } else {
        setJeuReussi(false); // Le jeu n'est pas réussi
        // Comparaison alphabétique
        if (motLettre.toLowerCase() < nomActuel.toLowerCase()) {
          setComparaison("Trop bas !");
        } else {
          setComparaison("Trop haut !");
        }
      }
      
      // Optionnel : réinitialiser motLettre après avoir stocké
      setMotLettre("");
    }
  };

  // Fonction pour filtrer les prénoms en fonction du mot saisi
  const filtrerPrenoms = () => {
    return prenoms.filter((prenom) =>
      prenom.toLowerCase().includes(motLettre.toLowerCase()) // Recherche partielle, insensible à la casse
    );
  };

  // Fonction pour gérer la sélection d'un prénom dans la liste
  const gererClicNom = (nom: string) => {
    setMotLettre(nom); // Le prénom sélectionné devient le texte dans le champ de saisie
    setMotStocke(nom);  // On stocke également ce prénom comme "mot stocké"
    
    // Vérification si le nom sélectionné correspond au nom à trouver
    if (nom.toLowerCase() === nomActuel.toLowerCase()) {
      setJeuReussi(true); // Le jeu est réussi
      setComparaison(""); // Réinitialiser le message
    } else {
      setJeuReussi(false); // Le jeu n'est pas réussi
      // Comparaison alphabétique
      if (nom.toLowerCase() < nomActuel.toLowerCase()) {
        setComparaison("Trop bas !");
      } else {
        setComparaison("Trop haut !");
      }
    }
  };

  // Appel au chargement du composant
  useEffect(() => {
    choisirNomAleatoire();

    // Ajouter un événement pour écouter la touche "P"
    const gererToucheGlobale = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        setPause(prevPause => !prevPause); // Alterner entre pause et reprise
      }
    };

    // Attacher l'événement à l'élément document
    document.addEventListener("keydown", gererToucheGlobale);

    // Nettoyer l'événement à la destruction du composant
    return () => {
      document.removeEventListener("keydown", gererToucheGlobale);
    };
  }, []);

  return (
    <div className="background-container">
      <Chrono tempsDeJeu={30} pause={pause} reussite={jeuReussi}/> {/* Le chrono reçoit l'état de pause */}
      <div className="jeu-container">
        {/* Champ de texte avec gestion de la touche Entrée */}
        <h2>Trouve le bon Etudiant</h2>
        <input 
          type="text" 
          placeholder="Entrez un texte" 
          value={motLettre}
          onChange={gererChangement} 
          onKeyDown={gererTouche} // Ajout de l'événement pour la touche "Entrée"
        />
        <p>Mot saisi : {motStocke}</p>

        {/* Affichage des prénoms filtrés uniquement si l'utilisateur commence à écrire */}
        {motLettre && (
          <div  style={{ overflow: "hidden", height:"auto"}}>
            <h3>Prénoms correspondant :</h3>
            <ul>
              {filtrerPrenoms().map((prenom, index) => (
                <h4 
                  key={index} 
                  onClick={() => gererClicNom(prenom)} // Gérer le clic sur un prénom
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} // Style pour indiquer que c'est cliquable
                >
                  {prenom}
                </h4>
              ))}
            </ul>
          </div>
        )}

        {/* Affichage du message de succès ou de comparaison */}
        {jeuReussi && (
          <div>
            <h3>Félicitations ! Vous avez trouvé le bon prénom !</h3>
          </div>
        )}
        {!jeuReussi && comparaison && (
          <div>
            <h3>{comparaison}</h3>
          </div>
        )}

        {/* Affichage de l'état de pause */}
        {pause && (
          <div>
            <h3>Le jeu est en pause. Appuyez sur "P" pour reprendre.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default JeuTrouverLaPersonne;
