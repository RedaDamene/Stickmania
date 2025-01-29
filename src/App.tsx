import './App.css'
import Chrono from './composants/Chrono/Chrono';
import Score from './composants/Score/Score';
import JeuTiming from './pages/Jeu-timing/Jeu-timing';

function App() {


  return (    
    <>
      <img className="background" src="src/assets/Stickmania_3.png" alt="Stickmania" />
      <Chrono tempsDeJeu={150} pause={false} reussite={false} />
      <Score />
      <div className='main-container'>
        <div className="game">
          <JeuTiming />
          </div>
      </div>
    </>
  )
}

export default App;
