import { type Player } from '../types';
import { motion } from 'framer-motion';

interface Props {
  players: Player[];
  currentPlayerIndex: number;
}

export const Scoreboard: React.FC<Props> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="scoreboard-container">
      {players.map((player, i) => (
        <motion.div
          key={i}
          className={`score-item ${i === currentPlayerIndex ? 'active' : ''} ${player.isEliminated ? 'eliminated' : ''}`}
          animate={{ scale: i === currentPlayerIndex ? 1.05 : 1 }}
        >
          <div className="player-info">
            <span className="player-name">{player.name}</span>
            {player.isEliminated && <span className="eliminated-tag">OUT</span>}
          </div>
          <span className="player-score">{player.score}</span>
        </motion.div>
      ))}
      <style>{`
        .scoreboard-container {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 100;
          pointer-events: none;
        }
        .score-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          min-width: 150px;
          transition: all 0.3s ease;
        }
        .score-item.active {
          background: var(--gradient);
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(255, 71, 126, 0.3);
        }
        .score-item.eliminated {
          opacity: 0.5;
          text-decoration: line-through;
          background: rgba(0, 0, 0, 0.2);
        }
        .player-name {
          font-weight: 600;
        }
        .player-score {
          font-weight: 800;
          font-size: 1.2rem;
        }
        .eliminated-tag {
          font-size: 0.7rem;
          background: #ff0000;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
          text-decoration: none;
          display: inline-block;
        }
        @media (max-width: 800px) {
          .scoreboard-container {
            position: relative;
            top: 0;
            right: 0;
            margin-bottom: 20px;
            flex-direction: row;
            flex-wrap: wrap;
            pointer-events: auto;
          }
          .score-item {
            min-width: 100px;
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};
