"use client";

interface GameControlsProps {
  onRestart: () => void;
  onNewGame: () => void;
}

export function GameControls({ onRestart, onNewGame }: GameControlsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onRestart}
        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 active:scale-95"
      >
        🔄 Restart Game
      </button>
      <button
        onClick={onNewGame}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 active:scale-95"
      >
        🆕 New Game
      </button>
    </div>
  );
}
