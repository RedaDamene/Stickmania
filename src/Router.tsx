import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import JeuTiming from "./pages/Jeu-timing/Jeu-timing";
import JeuMorpion from "./pages/Morpion/Jeu-Morpion";
import JeuDuClavier from "./pages/JeuDuClavier/JeuDuClavier";
import ClicCouleur from "./composants/ClicCouleur/ClicCouleur";
import ClickGame from "./composants/ClickGame/ClickGame";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
                <Route path="/app/jeuTiming" element={<JeuTiming />} />
                <Route path="/app/jeuMorpion" element={<JeuMorpion />} />
                <Route path="/app/JeuDuClavier" element={<JeuDuClavier />} />
                <Route path="/app/jeuClickGame" element={<ClickGame />} />
                <Route path="/app/jeuClicCouleur" element={<ClicCouleur/>} />
                <Route path="*" element="404" />
            </Routes>
        </BrowserRouter>
    );
}