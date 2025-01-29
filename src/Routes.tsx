// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ui/BoutonJouer'; // Exemple de page


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Définir les routes ici */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
