import React from "react";
import ReactDOM from "react-dom/client";
import InstructionLightbox from "./components/Instruction/Instruction";
import "./index.css";

const App = () => (
  <>
    <InstructionLightbox />
  </>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
