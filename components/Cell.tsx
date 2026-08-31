"use client";

interface CellProps {
  value: string | null;
  onClick: () => void;
  isDisabled: boolean;
  isWinning: boolean;
  cellIndex: number;
}

export function Cell({
  value,
  onClick,
  isDisabled,
  isWinning,
  cellIndex,
}: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={`Cell ${cellIndex + 1}, ${value || "empty"}`}
      className={`
        aspect-square
        text-4xl font-bold
        border-2 border-slate-400
        rounded-lg
        transition-all duration-200
        flex items-center justify-center
        ${value === "X" ? "text-blue-400" : value === "O" ? "text-red-400" : ""}
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-700"}
        ${
          isWinning
            ? "winning-highlight border-amber-400"
            : "hover:border-slate-300 bg-slate-800"
        }
        ${value ? "cell-enter" : ""}
      `}
    >
      {value}
    </button>
  );
}
