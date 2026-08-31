"use client";

import { GameMode } from "@/lib/gameLogic";

interface GameStatusProps {
  status: "playing" | "playerWon" | "aiWon" | "draw";
  isAiThinking: boolean;
  gameMode: GameMode;
  currentPlayer?: "X" | "O";
}

export function GameStatus({
  status,
  isAiThinking,
  gameMode,
  currentPlayer,
}: GameStatusProps) {
  let message = "";
  let textColor = "text-slate-100";

  if (isAiThinking) {
    message = "🤖 AI is thinking...";
    textColor = "text-amber-300";
  } else if (status === "playerWon") {
    if (gameMode === "two-player") {
      message = `🎉 Player ${currentPlayer} Wins!`;
    } else {
      message = "🎉 You Win!";
    }
    textColor = "text-blue-400";
  } else if (status === "aiWon") {
    if (gameMode === "two-player") {
      message = `🎉 Player ${currentPlayer} Wins!`;
    } else {
      message = "🤖 AI Wins!";
    }
    textColor = "text-red-400";
  } else if (status === "draw") {
    message = "🤝 It's a Draw!";
    textColor = "text-amber-400";
  } else {
    if (gameMode === "two-player") {
      message = `Player ${currentPlayer}'s Turn`;
    } else {
      message = "Your Turn — Choose a Square";
    }
    textColor = "text-slate-100";
  }

  return (
    <div
      className={`
        text-center py-4 px-6 rounded-lg
        font-semibold text-lg
        transition-all duration-300
        animate-fade-in
        ${
          status === "playerWon"
            ? "bg-blue-500/20 border-2 border-blue-400"
            : status === "aiWon"
              ? "bg-red-500/20 border-2 border-red-400"
              : status === "draw"
                ? "bg-amber-500/20 border-2 border-amber-400"
                : "bg-slate-700 border-2 border-slate-600"
        }
        ${textColor}
      `}
    >
      {message}
    </div>
  );
}
