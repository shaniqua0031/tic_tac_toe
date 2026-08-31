"use client";

import { Difficulty } from "@/lib/gameLogic";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  isDisabled: boolean;
}

export function DifficultySelector({
  difficulty,
  onDifficultyChange,
  isDisabled,
}: DifficultySelectorProps) {
  const difficulties: { value: Difficulty; label: string; description: string }[] =
    [
      { value: "easy", label: "🟢 Easy", description: "Mostly random moves" },
      { value: "medium", label: "🟡 Medium", description: "Blocks & attacks" },
      { value: "hard", label: "🔴 Hard", description: "Optimal Minimax" },
    ];

  return (
    <div className="bg-slate-700 rounded-lg p-4 shadow-lg">
      <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">
        Difficulty
      </label>
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        disabled={isDisabled}
        className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {difficulties.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label} - {d.description}
          </option>
        ))}
      </select>
    </div>
  );
}
