import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import GameScreen from './GameScreen';
import StartScreen from './StartScreen';
import OffGameScreen from './OffGameScreen';






const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={<StartScreen/>}/>
          <Route path='/GameScreen' element={<GameScreen/>}/>
          <Route path='/OffGameScreen' element={<OffGameScreen/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
