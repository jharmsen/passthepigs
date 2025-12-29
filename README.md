# Pass the Pigs - Scoring App 🐷

A modern, responsive, and aesthetically pleasing scoring application for the classic game "Pass the Pigs". Built with React, Vite, and Framer Motion for a premium user experience.

## Features

- **2-5 Player Support**: Multi-player support with animated entry.
- **Dynamic Scoring**: Real-time points calculation with visual feedback.
- **Rules Integrated**: Handles Siders, Trotters, Snouters, Leaning Jowlers, Oinkers (Pig Outs), Makin' Bacon, and Piggybacks.
- **Premium Design**: Dark mode with glassmorphism, vibrant gradients, and smooth transitions.
- **Game Persistence**: floating scoreboard to keep track of everyone's status.
- **Elimination Handling**: Supports the "Piggyback" rule to eliminate players.

## Tech Stack

- **React**: UI components and state management.
- **TypeScript**: Type safety for scoring logic.
- **Vite**: Fast development and building.
- **Lucide React**: Clean icons.
- **Framer Motion**: Smooth entry and list animations.
- **Vanilla CSS**: Custom premium styling.
- **Antigravity**: Built using the Antigravity agentic coding assistant.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Rules Implemented

- **Sider**: 1 pt
- **Trotter**: 5 pts (Single) / 20 pts (Double)
- **Razorback**: 5 pts (Single) / 20 pts (Double)
- **Snouter**: 10 pts (Single) / 40 pts (Double)
- **Leaning Jowler**: 15 pts (Single) / 60 pts (Double)
- **Pig Out**: Turn score resets to 0, turn ends.
- **Makin' Bacon**: Total score resets to 0, turn ends.
- **Piggyback**: Player eliminated from the game.

## License

MIT
