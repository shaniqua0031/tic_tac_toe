"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createNewBoard,
  checkWinner,
  checkDraw,
  getAIMove,
  isCellValid,
  type Difficulty,
  type GameMode,
  type Score,
} from "@/lib/gameLogic";
import { Board } from "./Board";
import { ScoreBoard } from "./ScoreBoard";
import { DifficultySelector } from "./DifficultySelector";
import { ModeSelector } from "./ModeSelector";
import { GameStatus } from "./GameStatus";
import { GameControls } from "./GameControls";

export function TicTacToe() {
  // Game mode and difficulty
  const [gameMode, setGameMode] = useState<GameMode>("single");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  // Game state
  const [board, setBoard] = useState<(string | null)[]>(createNewBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameStatus, setGameStatus] = useState<
    "playing" | "playerWon" | "aiWon" | "draw"
  >("playing");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [winningCombination, setWinningCombination] = useState<number[] | null>(
    null
  );

  // Score state
  const [score, setScore] = useState<Score>({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
  });
  const [roundNumber, setRoundNumber] = useState(1);
  const [winStreak, setWinStreak] = useState(0);

  // Handle cell click
  const handleCellClick = useCallback(
    (index: number) => {
      // Check if move is valid
      if (gameStatus !== "playing" || !isCellValid(board, index)) {
        return;
      }

      // In single player mode, prevent moves during AI thinking
      if (gameMode === "single" && (isAiThinking || currentPlayer !== "X")) {
        return;
      }

      // In two player mode, prevent moves after game ends
      if (gameMode === "two-player" && gameStatus !== "playing") {
        return;
      }

      // Make the move
      const newBoard = [...board];
      const player = currentPlayer;
      newBoard[index] = player;
      setBoard(newBoard);

      // Check for winner
      const { winner, combination } = checkWinner(newBoard);
      if (winner) {
        setGameStatus(winner === "X" ? "playerWon" : "aiWon");
        setWinningCombination(combination);

        if (winner === "X") {
          setScore((prev) => ({
            ...prev,
            playerWins: prev.playerWins + 1,
          }));
          setWinStreak((prev) => prev + 1);
        } else {
          setScore((prev) => ({
            ...prev,
            aiWins: prev.aiWins + 1,
          }));
          setWinStreak(0);
        }
        return;
      }

      // Check for draw
      if (checkDraw(newBoard)) {
        setGameStatus("draw");
        setScore((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
        setWinStreak(0);
        return;
      }

      // Switch player or trigger AI
      if (gameMode === "single") {
        // Single player: X (human) just moved, now AI's turn
        if (player === "X") {
          setIsAiThinking(true);
        }
      } else {
        // Two player: switch to other player
        setCurrentPlayer(player === "X" ? "O" : "X");
      }
    },
    [board, gameStatus, isAiThinking, currentPlayer, gameMode]
  );

  // Handle AI move in single player mode
  useEffect(() => {
    if (gameMode !== "single" || !isAiThinking || gameStatus !== "playing") {
      return;
    }

    const timer = setTimeout(() => {
      const aiMove = getAIMove(board, difficulty);

      if (!isCellValid(board, aiMove)) {
        setIsAiThinking(false);
        return;
      }

      // Make AI move
      const newBoard = [...board];
      newBoard[aiMove] = "O";
      setBoard(newBoard);

      // Check for winner
      const { winner, combination } = checkWinner(newBoard);
      if (winner) {
        setGameStatus(winner === "X" ? "playerWon" : "aiWon");
        setWinningCombination(combination);

        if (winner === "X") {
          setScore((prev) => ({
            ...prev,
            playerWins: prev.playerWins + 1,
          }));
          setWinStreak((prev) => prev + 1);
        } else {
          setScore((prev) => ({
            ...prev,
            aiWins: prev.aiWins + 1,
          }));
          setWinStreak(0);
        }
        setIsAiThinking(false);
        return;
      }

      // Check for draw
      if (checkDraw(newBoard)) {
        setGameStatus("draw");
        setScore((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
        setWinStreak(0);
        setIsAiThinking(false);
        return;
      }

      // Switch back to player
      setCurrentPlayer("X");
      setIsAiThinking(false);
    }, 600); // AI thinking delay

    return () => clearTimeout(timer);
  }, [isAiThinking, board, gameStatus, difficulty, gameMode]);

  // Handle mode change
  const handleModeChange = (newMode: GameMode) => {
    setGameMode(newMode);
    setBoard(createNewBoard());
    setCurrentPlayer("X");
    setGameStatus("playing");
    setWinningCombination(null);
    setIsAiThinking(false);
    setRoundNumber(1);
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  // Restart game (keep score and settings)
  const handleRestart = useCallback(() => {
    setBoard(createNewBoard());
    setCurrentPlayer("X");
    setGameStatus("playing");
    setWinningCombination(null);
    setIsAiThinking(false);
    setRoundNumber((prev) => prev + 1);
  }, []);

  // New game (reset score)
  const handleNewGame = useCallback(() => {
    setBoard(createNewBoard());
    setCurrentPlayer("X");
    setGameStatus("playing");
    setWinningCombination(null);
    setIsAiThinking(false);
    setScore({
      playerWins: 0,
      aiWins: 0,
      draws: 0,
    });
    setRoundNumber(1);
    setWinStreak(0);
    setDifficulty("medium");
  }, []);

  // Determine if board is disabled
  const isBoardDisabled = () => {
    if (gameStatus !== "playing") return true;
    if (gameMode === "single") {
      return isAiThinking || currentPlayer !== "X";
    }
    return false;
  };

  // Determine subtitle text
  const getSubtitle = () => {
    if (gameMode === "single") {
      return "You: ❌ X | CPU: ⭕ O";
    } else {
      return "Player 1: ❌ X | Player 2: ⭕ O";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in">
            TIC-TAC-TOE 🎮
          </h1>
          <p className="text-slate-300">{getSubtitle()}</p>
        </div>

        {/* Mode Selector */}
        <ModeSelector
          gameMode={gameMode}
          onModeChange={handleModeChange}
          isDisabled={false}
        />

        {/* Difficulty Selector - Only show in single player mode */}
        {gameMode === "single" && (
          <DifficultySelector
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            isDisabled={gameStatus !== "playing"}
          />
        )}

        {/* Score Board */}
        <ScoreBoard
          score={score}
          winStreak={winStreak}
          roundNumber={roundNumber}
          gameMode={gameMode}
        />

        {/* Game Status */}
        <GameStatus
          status={gameStatus}
          isAiThinking={isAiThinking}
          gameMode={gameMode}
          currentPlayer={currentPlayer}
        />

        {/* Board */}
        <Board
          board={board}
          onCellClick={handleCellClick}
          isDisabled={isBoardDisabled()}
          winningCombination={winningCombination}
        />

        {/* Controls */}
        <GameControls onRestart={handleRestart} onNewGame={handleNewGame} />

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>
            {gameMode === "single"
              ? "Select difficulty and click cells to play"
              : "Take turns clicking cells"}
          </p>
        </div>
      </div>
    </div>
  );
}
