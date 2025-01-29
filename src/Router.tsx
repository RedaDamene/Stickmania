import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import JeuTiming from "./pages/Jeu-timing/Jeu-timing";
import JeuDuClavier from "./pages/JeuDuClavier/JeuDuClavier";
import ClicCouleur from "./composants/ClicCouleur/ClicCouleur";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
                <Route path="/app/jeuTiming" element={<JeuTiming />} />
                <Route path="/app/JeuDuClavier" element={<JeuDuClavier />} />
                <Route path="/app/jeuClicCouleur" element={<ClicCouleur/>} />
                <Route path="*" element="404" />
            </Routes>
        </BrowserRouter>
    );
}