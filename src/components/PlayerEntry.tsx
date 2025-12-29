import React, { useState } from 'react';
import { UserPlus, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    onStart: (names: string[]) => void;
}

export const PlayerEntry: React.FC<Props> = ({ onStart }) => {
    const [names, setNames] = useState<string[]>(['', '']);

    const addPlayer = () => {
        if (names.length < 5) {
            setNames([...names, '']);
        }
    };

    const removePlayer = (index: number) => {
        if (names.length > 2) {
            setNames(names.filter((_, i) => i !== index));
        }
    };

    const updateName = (index: number, val: string) => {
        const next = [...names];
        next[index] = val;
        setNames(next);
    };

    const isValid = names.every(n => n.trim().length > 0);

    return (
        <div className="glass-card animate-fade-in">
            <h1>🐷 Pass the Pigs</h1>
            <p style={{ color: 'var(--text-dim)', marginBottom: '24px' }}>Enter player names to start (2-5 players)</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <AnimatePresence>
                    {names.map((name, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ display: 'flex', gap: '8px' }}
                        >
                            <input
                                className="input"
                                placeholder={`Player ${i + 1}`}
                                value={name}
                                onChange={(e) => updateName(i, e.target.value)}
                            />
                            {names.length > 2 && (
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '12px' }}
                                    onClick={() => removePlayer(i)}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                {names.length < 5 && (
                    <button className="btn btn-secondary" style={{ flex: 1 }} onClick={addPlayer}>
                        <UserPlus size={18} /> Add
                    </button>
                )}
                <button
                    className="btn"
                    style={{ flex: 2 }}
                    disabled={!isValid}
                    onClick={() => onStart(names)}
                >
                    <Play size={18} /> Start Game
                </button>
            </div>
        </div>
    );
};
