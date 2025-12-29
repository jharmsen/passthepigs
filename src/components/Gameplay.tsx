import React, { useState } from 'react';
import { type Player } from '../types';
import { type PigPosition, calculateScore, POSITION_NAMES } from '../utils/logic';
import { Save, AlertTriangle, Skull, LogOut } from 'lucide-react';

interface Props {
    currentPlayer: Player;
    onTurnEnd: (score: number) => void;
    onMakinBacon: () => void;
    onPiggyback: () => void;
    onNewGame: () => void;
}

const POSITIONS: PigPosition[] = ['no-dot', 'dot', 'trotter', 'razorback', 'snouter', 'leaning-jowler'];

export const Gameplay: React.FC<Props> = ({
    currentPlayer, onTurnEnd, onMakinBacon, onPiggyback, onNewGame
}) => {
    const [turnScore, setTurnScore] = useState(0);
    const [pos1, setPos1] = useState<PigPosition>('none');
    const [pos2, setPos2] = useState<PigPosition>('none');

    const result = calculateScore(pos1, pos2);
    const isSelected = pos1 !== 'none' && pos2 !== 'none';

    const resetSelections = () => {
        setPos1('none');
        setPos2('none');
    };

    const handleRecordRoll = () => {
        if (!isSelected) return;

        if (result.isPigOut) {
            setTurnScore(0);
            onTurnEnd(0);
            resetSelections();
        } else {
            setTurnScore(prev => prev + result.points);
            resetSelections();
        }
    };

    const handleEndTurn = () => {
        onTurnEnd(turnScore);
        setTurnScore(0);
        resetSelections();
    };

    const wrappedMakinBacon = () => {
        onMakinBacon();
        setTurnScore(0);
        resetSelections();
    };

    const wrappedPiggyback = () => {
        onPiggyback();
        setTurnScore(0);
        resetSelections();
    };

    return (
        <div className="glass-card animate-fade-in" style={{ width: '100%' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <span className="row-label" style={{ marginBottom: 0 }}>CURRENT PLAYER</span>
                    <h2 style={{ margin: 0 }}>{currentPlayer.name}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span className="row-label" style={{ marginBottom: 0 }}>TURN SCORE</span>
                    <div className="turn-score-badge">{turnScore}</div>
                </div>
            </div>

            <div className="pig-selector">
                <PigRow label="Pig 1" current={pos1} onChange={setPos1} />
                <div className="divider" />
                <PigRow label="Pig 2" current={pos2} onChange={setPos2} />
            </div>

            <div className="roll-result-pane">
                <div className="points-preview">
                    {!isSelected ? (
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Select positions to score roll</span>
                    ) : result.isPigOut ? (
                        <span className="pig-out-text">PIG OUT!</span>
                    ) : (
                        <span className="points-val">+{result.points} pts</span>
                    )}
                </div>
                <button
                    className="btn"
                    style={{ width: '100%' }}
                    disabled={!isSelected}
                    onClick={handleRecordRoll}
                >
                    <Save size={20} /> {result.isPigOut ? 'End Turn (0 pts)' : isSelected ? 'Add Roll' : 'Select Pigs'}
                </button>
            </div>

            <div className="special-actions">
                <button className="btn btn-secondary action-btn" onClick={wrappedMakinBacon}>
                    <AlertTriangle size={20} color="#ffb100" />
                    <div>Makin’ Bacon</div>
                </button>
                <button className="btn btn-secondary action-btn" onClick={wrappedPiggyback}>
                    <Skull size={20} color="#ff477e" />
                    <div>Piggyback</div>
                </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                    className="btn"
                    style={{ flex: 1, background: 'var(--text)', color: 'var(--background)' }}
                    onClick={handleEndTurn}
                >
                    <Save size={18} /> Bank {turnScore} Pts
                </button>
                <button className="btn btn-secondary" onClick={onNewGame}>
                    <LogOut size={18} />
                </button>
            </div>

            <style>{`
        .turn-score-badge {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          text-shadow: 0 0 20px rgba(255, 71, 126, 0.3);
        }
        .pig-selector {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        .divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        .row-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          margin-bottom: 8px;
          display: block;
        }
        .pos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .pos-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 4px;
          border-radius: 12px;
          color: white;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pos-btn.active {
          background: rgba(255, 71, 126, 0.2);
          border-color: var(--primary);
          color: var(--primary);
        }
        .roll-result-pane {
          background: rgba(0, 0, 0, 0.2);
          padding: 20px;
          border-radius: 20px;
          margin-bottom: 24px;
          text-align: center;
        }
        .points-preview {
          margin-bottom: 12px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .points-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: #4ade80;
        }
        .pig-out-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #f87171;
        }
        .special-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .action-btn {
          flex-direction: column;
          padding: 12px;
          font-size: 0.7rem;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }
      `}</style>
        </div>
    );
};

const PigRow: React.FC<{ label: string, current: PigPosition, onChange: (p: PigPosition) => void }> = ({ label, current, onChange }) => (
    <div>
        <span className="row-label">{label}</span>
        <div className="pos-grid">
            {POSITIONS.map(p => (
                <button
                    key={p}
                    className={`pos-btn ${current === p ? 'active' : ''}`}
                    onClick={() => onChange(current === p ? 'none' : p)}
                >
                    {POSITION_NAMES[p]}
                </button>
            ))}
        </div>
    </div>
);
