"use client";

import { GameMode } from "@/lib/gameLogic";

interface ModeSelectorProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  isDisabled: boolean;
}

export function ModeSelector({
  gameMode,
  onModeChange,
  isDisabled,
}: ModeSelectorProps) {
  const modes: { value: GameMode; label: string; description: string }[] = [
    { value: "single", label: "🤖 vs CPU", description: "Play against AI" },
    {
      value: "two-player",
      label: "👥 Two Player",
      description: "Play with a friend",
    },
  ];

  return (
    <div className="bg-slate-700 rounded-lg p-4 shadow-lg">
      <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">
        Game Mode
      </label>
      <div className="grid grid-cols-2 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            disabled={isDisabled}
            className={`
              px-4 py-3 rounded-lg font-semibold
              transition-all duration-200
              flex flex-col items-center justify-center
              ${
                gameMode === mode.value
                  ? "bg-blue-600 text-white border-2 border-blue-400"
                  : "bg-slate-800 text-slate-300 border-2 border-slate-600 hover:border-slate-500"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="text-lg">{mode.label}</div>
            <div className="text-xs text-slate-400">{mode.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
