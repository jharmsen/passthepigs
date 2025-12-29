import { useState } from 'react';
import { PlayerEntry } from './components/PlayerEntry';
import { Gameplay } from './components/Gameplay';
import { Scoreboard } from './components/Scoreboard';
import { type Player } from './types';

export default function App() {
  const [screen, setScreen] = useState<'ENTRY' | 'GAME'>('ENTRY');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const startGame = (names: string[]) => {
    setPlayers(names.map(name => ({ name, score: 0, isEliminated: false })));
    setCurrentPlayerIndex(0);
    setScreen('GAME');
  };

  const nextTurn = () => {
    let nextIndex = (currentPlayerIndex + 1) % players.length;
    // Skip eliminated players
    let attempts = 0;
    while (players[nextIndex].isEliminated && attempts < players.length) {
      nextIndex = (nextIndex + 1) % players.length;
      attempts++;
    }

    if (attempts === players.length) {
      // Everyone eliminated? Should handle results
      return;
    }

    setCurrentPlayerIndex(nextIndex);
  };

  const updatePlayerScore = (index: number, newScore: number) => {
    setPlayers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], score: newScore };
      return next;
    });
  };

  const eliminatePlayer = (index: number) => {
    setPlayers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], isEliminated: true };
      return next;
    });
    nextTurn();
  };

  const newGame = () => {
    setScreen('ENTRY');
    setPlayers([]);
    setCurrentPlayerIndex(0);
  };

  return (
    <div className="app-container">
      {screen === 'ENTRY' && <PlayerEntry onStart={startGame} />}
      {screen === 'GAME' && (
        <>
          <Scoreboard players={players} currentPlayerIndex={currentPlayerIndex} />
          <Gameplay
            currentPlayer={players[currentPlayerIndex]}
            onTurnEnd={(score: number) => {
              updatePlayerScore(currentPlayerIndex, players[currentPlayerIndex].score + score);
              nextTurn();
            }}
            onMakinBacon={() => {
              updatePlayerScore(currentPlayerIndex, 0);
              nextTurn();
            }}
            onPiggyback={() => {
              eliminatePlayer(currentPlayerIndex);
            }}
            onNewGame={newGame}
          />
        </>
      )}
    </div>
  );
}
