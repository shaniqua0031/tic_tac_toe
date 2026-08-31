"use client";

import { Score, GameMode } from "@/lib/gameLogic";

interface ScoreBoardProps {
  score: Score;
  winStreak: number;
  roundNumber: number;
  gameMode: GameMode;
}

export function ScoreBoard({
  score,
  winStreak,
  roundNumber,
  gameMode,
}: ScoreBoardProps) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-700 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-slate-300 uppercase tracking-wider">
              {gameMode === "two-player" ? "Player 1" : "You"}
            </p>
            <p className="text-3xl font-bold text-blue-400">
              {score.playerWins}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-300 uppercase tracking-wider">
              Draws
            </p>
            <p className="text-3xl font-bold text-amber-400">{score.draws}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300 uppercase tracking-wider">
              {gameMode === "two-player" ? "Player 2" : "AI"}
            </p>
            <p className="text-3xl font-bold text-red-400">{score.aiWins}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <p className="text-xs text-slate-400 uppercase">Round</p>
          <p className="text-2xl font-bold text-slate-100">{roundNumber}</p>
        </div>
        {winStreak > 0 && gameMode === "single" && (
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg p-3 text-center">
            <p className="text-xs text-white uppercase">Win Streak 🔥</p>
            <p className="text-2xl font-bold text-white">{winStreak}</p>
          </div>
        )}
      </div>
    </div>
  );
}
