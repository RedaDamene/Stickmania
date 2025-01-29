import { useEffect, useState } from "react";
import JeuTiming from "../Jeu-timing/Jeu-timing";
import Labyrinthe from "../../composants/souriciere/souriciere";

const Selection = () => {
    const [statutJeu, setStatutJeu] = useState("non");
    const ListeJeux = [<JeuTiming statut={setStatutJeu}/>, <Labyrinthe statut={setStatutJeu}/>];
    const [jeu, setJeu] = useState<React.ReactElement | null>(null);
    const [count, setCount] = useState(0)
    const ajoutScore = () => {
      setCount(count + 1)
    }
    useEffect(() => {
        console.log("Statut du jeu : ", statutJeu);
        if (statutJeu == "gagne") {
            ajoutScore();
        }
        setJeu(null);
        setStatutJeu("non");
    }, [statutJeu]);

    useEffect(() => {
        if (jeu == null) {
            const randomJeu = Math.floor(Math.random() * ListeJeux.length);
            setJeu(ListeJeux[randomJeu]);
        }
    },[jeu]);

    return (
        <div>
            {jeu}
        </div>
    );
};

export default Selection;
