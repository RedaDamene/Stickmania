import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import JeuTiming from "./pages/Jeu-timing/Jeu-timing";
import JeuTapeTaupe from "./pages/JeuTapeTaupe/TapeTaupe";
import JeuTrouveIntru from "./pages/JeuTrouveIntru/TrouveIntru";
import ClicCouleur from "./composants/ClicCouleur/ClicCouleur";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
                <Route path="/app/jeuTiming" element={<JeuTiming />} />
                <Route path="/app/jeuTapeTaupe" element={<JeuTapeTaupe/>}/>
                <Route path="/app/jeuTrouveIntru" element={<JeuTrouveIntru/>}/>
                <Route path="/app/jeuClicCouleur" element={<ClicCouleur/>} />
                <Route path="*" element="404" />
            </Routes>
        </BrowserRouter>
    );
}