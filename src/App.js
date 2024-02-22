import React, { useState } from 'react';
import GameScreen from './GameScreen';
import StartScreen from './StartScreen';



const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      {gameStarted ? (
        <GameScreen />
      ) : (
        <StartScreen onStartGame={startGame} />
      )}
    </div>
  );
};

export default App;
