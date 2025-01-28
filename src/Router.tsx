import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/app" element="Hello World" />
            </Routes>
        </BrowserRouter>
    );
}