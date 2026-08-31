export type Player = "X" | "O" | null;
export type Difficulty = "easy" | "medium" | "hard";
export type GameMode = "single" | "two-player";

export interface GameState {
  board: Player[];
  currentPlayer: Player;
  gameStatus: "playing" | "playerWon" | "aiWon" | "draw" | "draw";
  difficulty: Difficulty;
  gameMode: GameMode;
  winningCombination: number[] | null;
}

export interface Score {
  playerWins: number;
  aiWins: number;
  draws: number;
}

// All possible winning combinations
export const WINNING_COMBINATIONS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Check if there's a winner on the board
 * @returns {Object} - { winner: Player, combination: number[] } or { winner: null }
 */
export function checkWinner(board: Player[]): {
  winner: Player;
  combination: number[] | null;
} {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combination };
    }
  }
  return { winner: null, combination: null };
}

/**
 * Check if the board is full (draw condition)
 */
export function checkDraw(board: Player[]): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Get all available moves (empty cells)
 */
export function getAvailableMoves(board: Player[]): number[] {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null) as number[];
}

/**
 * Count the number of each player's pieces
 */
export function countPieces(board: Player[], player: Player) {
  return board.filter((cell) => cell === player).length;
}

/**
 * Evaluate the board state for the minimax algorithm
 */
export function evaluateBoard(board: Player[]): number {
  const { winner } = checkWinner(board);

  if (winner === "O") return 10;
  if (winner === "X") return -10;
  return 0;
}

/**
 * Get the best move using minimax algorithm
 */
export function minimax(
  board: Player[],
  depth: number,
  isMaximizing: boolean
): number {
  const score = evaluateBoard(board);

  // Terminal states
  if (score === 10) return score - depth; // Prefer faster wins
  if (score === -10) return score + depth; // Prefer slower losses
  if (checkDraw(board)) return 0;

  if (isMaximizing) {
    let maxScore = -Infinity;
    const availableMoves = getAvailableMoves(board);

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = "O";
      const moveScore = minimax(newBoard, depth + 1, false);
      maxScore = Math.max(maxScore, moveScore);
    }

    return maxScore;
  } else {
    let minScore = Infinity;
    const availableMoves = getAvailableMoves(board);

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = "X";
      const moveScore = minimax(newBoard, depth + 1, true);
      minScore = Math.min(minScore, moveScore);
    }

    return minScore;
  }
}

/**
 * Get the best move for the AI using minimax
 */
export function getBestMove(board: Player[]): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  const availableMoves = getAvailableMoves(board);

  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = "O";
    const score = minimax(newBoard, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

/**
 * Get a random legal move for Easy AI
 */
export function getRandomMove(board: Player[]): number {
  const availableMoves = getAvailableMoves(board);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

/**
 * Get the Medium AI move
 * Priority: Win > Block > Occasional Strategy > Random
 */
export function getMediumMove(board: Player[]): number {
  const availableMoves = getAvailableMoves(board);

  // 1. Check if AI can win
  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = "O";
    const { winner } = checkWinner(testBoard);
    if (winner === "O") return move;
  }

  // 2. Block player from winning
  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = "X";
    const { winner } = checkWinner(testBoard);
    if (winner === "X") return move;
  }

  // 3. Sometimes try center or corner (strategic moves)
  if (Math.random() < 0.3) {
    const strategicMoves = availableMoves.filter((move) =>
      [0, 2, 4, 6, 8].includes(move)
    );
    if (strategicMoves.length > 0) {
      return strategicMoves[Math.floor(Math.random() * strategicMoves.length)];
    }
  }

  // 4. Random move
  return getRandomMove(board);
}

/**
 * Get AI move based on difficulty
 */
export function getAIMove(
  board: Player[],
  difficulty: Difficulty
): number {
  if (difficulty === "easy") {
    return getRandomMove(board);
  } else if (difficulty === "medium") {
    return getMediumMove(board);
  } else {
    // hard
    return getBestMove(board);
  }
}

/**
 * Create a new empty board
 */
export function createNewBoard(): Player[] {
  return Array(9).fill(null);
}

/**
 * Check if a cell is valid and empty
 */
export function isCellValid(board: Player[], cellIndex: number): boolean {
  return cellIndex >= 0 && cellIndex < 9 && board[cellIndex] === null;
}
