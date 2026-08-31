"use client";

import { Cell } from "./Cell";
import { Player } from "@/lib/gameLogic";

interface BoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  isDisabled: boolean;
  winningCombination: number[] | null;
}

export function Board({
  board,
  onCellClick,
  isDisabled,
  winningCombination,
}: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 bg-slate-700 p-4 rounded-xl shadow-2xl">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isDisabled={isDisabled}
          isWinning={winningCombination?.includes(index) ?? false}
          cellIndex={index}
        />
      ))}
    </div>
  );
}
