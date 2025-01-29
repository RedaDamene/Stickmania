import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import JeuDuClavier from "./pages/JeuDuClavier/JeuDuClavier";
import JeuTiming from "./pages/Jeu-timing/Jeu-timing";
import JeuTapeTaupe from "./pages/JeuTapeTaupe/TapeTaupe";
export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
                <Route path="/app/jeuDuClavier" element={<JeuDuClavier />} />
                <Route path="/app/jeuTiming" element={<JeuTiming />} />
                <Route path="/app/jeuTapeTaupe" element={<JeuTapeTaupe/>}/>
            </Routes>
        </BrowserRouter>
    );
}