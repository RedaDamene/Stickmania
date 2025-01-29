import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import JeuTiming from "./pages/Jeu-timing/Jeu-timing";
import JeuMorpion from "./pages/Morpion/Jeu-morpion";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
                <Route path="/app/jeuTiming" element={<JeuTiming />} />
                <Route path="/app/jeuMorpion" element={<JeuMorpion />} />
                <Route path="*" element="404" />
            </Routes>
        </BrowserRouter>
    );
}