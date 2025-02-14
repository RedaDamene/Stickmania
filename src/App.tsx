import { useNavigate } from 'react-router-dom'
import './App.css'
import React from 'react'

function App() {
  const navigate = useNavigate()

  const handlePlay = () => {
    navigate('/app/jeuTiming')
  }

  return (
    <>
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur Stickmania !</h1>
      <p className="home-description">Une collection de jeux rapides et amusants !</p>
      <button className="play-button" onClick={handlePlay}>
        Play
      </button>
    </div>
    </>
  )
}

export default App