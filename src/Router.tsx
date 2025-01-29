import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import JeuDuClavier from "./pages/JeuDuClavier/JeuDuClavier";
export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
                <Route path="/app/jeuDuClavier" element={<JeuDuClavier />} />
            </Routes>
        </BrowserRouter>
    );
}