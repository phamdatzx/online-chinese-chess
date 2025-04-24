import { useState } from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";
import GameControls from "./GameControls";
import { GameState, PieceType, Player, Position } from "../lib/types";
import { initialBoardSetup } from "../lib/game-setup";
import { validateMove } from "../lib/move-validator";
import { isInCheck } from "../lib/check-validator";

export default function ChineseChessGame() {
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoardSetup(),
    currentPlayer: Player.RED,
    selectedPiece: null,
    moveHistory: [],
    gameStatus: "playing",
    redCaptures: [],
    blackCaptures: [],
  });

  // Add function to calculate available moves for selected piece
  const getAvailableMoves = (position: Position | null): Position[] => {
    if (!position) return [];

    const piece = gameState.board[position.row][position.col];
    if (!piece) return [];

    const availableMoves: Position[] = [];

    // Check each position on the board
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        const targetPos = { row, col };
        if (validateMove(gameState.board, position, targetPos, piece)) {
          availableMoves.push(targetPos);
        }
      }
    }

    return availableMoves;
  };

  const handleSquareClick = (position: Position) => {
    const { board, currentPlayer, selectedPiece } = gameState;
    const clickedSquare = board[position.row][position.col];

    // If no piece is selected and the clicked square has a piece of the current player
    if (
      !selectedPiece &&
      clickedSquare &&
      clickedSquare.player === currentPlayer
    ) {
      setGameState({
        ...gameState,
        selectedPiece: position,
      });
      return;
    }

    // If a piece is already selected
    if (selectedPiece) {
      // If clicking on the same piece, deselect it
      if (
        selectedPiece.row === position.row &&
        selectedPiece.col === position.col
      ) {
        setGameState({
          ...gameState,
          selectedPiece: null,
        });
        return;
      }

      // If clicking on another piece of the same player, select that piece instead
      if (clickedSquare && clickedSquare.player === currentPlayer) {
        setGameState({
          ...gameState,
          selectedPiece: position,
        });
        return;
      }

      // Attempt to move the selected piece
      const selectedPieceData = board[selectedPiece.row][selectedPiece.col];
      if (selectedPieceData) {
        const isValidMove = validateMove(
          board,
          selectedPiece,
          position,
          selectedPieceData
        );

        if (isValidMove) {
          // Create a new board with the move applied
          const newBoard = [...board.map((row) => [...row])];

          // Check if there's a capture
          let captures = gameState.redCaptures;
          if (currentPlayer === Player.BLACK) {
            captures = gameState.blackCaptures;
          }

          if (newBoard[position.row][position.col]) {
            captures = [...captures, newBoard[position.row][position.col]!];
          }

          // Move the piece
          newBoard[position.row][position.col] =
            newBoard[selectedPiece.row][selectedPiece.col];
          newBoard[selectedPiece.row][selectedPiece.col] = null;

          // Check for game over (general/king captured)
          let gameStatus = gameState.gameStatus;
          if (clickedSquare && clickedSquare.type === PieceType.GENERAL) {
            gameStatus = currentPlayer === Player.RED ? "redWin" : "blackWin";
          }

          // Check if the opponent is now in check
          const opponentPlayer =
            currentPlayer === Player.RED ? Player.BLACK : Player.RED;
          const resultedInCheck = isInCheck(newBoard, opponentPlayer);

          // Update game state
          setGameState({
            board: newBoard,
            currentPlayer:
              currentPlayer === Player.RED ? Player.BLACK : Player.RED,
            selectedPiece: null,
            moveHistory: [
              ...gameState.moveHistory,
              {
                from: selectedPiece,
                to: position,
                piece: selectedPieceData,
                resultedInCheck,
              },
            ],
            gameStatus,
            redCaptures:
              currentPlayer === Player.RED ? captures : gameState.redCaptures,
            blackCaptures:
              currentPlayer === Player.BLACK
                ? captures
                : gameState.blackCaptures,
          });
        } else {
          // Invalid move, just deselect the piece
          setGameState({
            ...gameState,
            selectedPiece: null,
          });
        }
      }
    }
  };

  const resetGame = () => {
    setGameState({
      board: initialBoardSetup(),
      currentPlayer: Player.RED,
      selectedPiece: null,
      moveHistory: [],
      gameStatus: "playing",
      redCaptures: [],
      blackCaptures: [],
    });
  };

  const undoMove = () => {
    if (gameState.moveHistory.length === 0) return;

    const newHistory = [...gameState.moveHistory];
    const lastMove = newHistory.pop()!;

    const newBoard = [...gameState.board.map((row) => [...row])];

    // Move the piece back
    newBoard[lastMove.from.row][lastMove.from.col] = lastMove.piece;

    // If there was a capture, we need to restore it
    const redCaptures = [...gameState.redCaptures];
    const blackCaptures = [...gameState.blackCaptures];

    if (gameState.currentPlayer === Player.RED && blackCaptures.length > 0) {
      const capturedPiece = blackCaptures.pop()!;
      newBoard[lastMove.to.row][lastMove.to.col] = capturedPiece;
    } else if (
      gameState.currentPlayer === Player.BLACK &&
      redCaptures.length > 0
    ) {
      const capturedPiece = redCaptures.pop()!;
      newBoard[lastMove.to.row][lastMove.to.col] = capturedPiece;
    } else {
      newBoard[lastMove.to.row][lastMove.to.col] = null;
    }

    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer:
        gameState.currentPlayer === Player.RED ? Player.BLACK : Player.RED,
      moveHistory: newHistory,
      gameStatus: "playing",
      redCaptures,
      blackCaptures,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl max-h-[80vh]">
      <div className="flex-1 max-w-[50]">
        <Board
          board={gameState.board}
          selectedPiece={gameState.selectedPiece}
          availableMoves={getAvailableMoves(gameState.selectedPiece)}
          onSquareClick={handleSquareClick}
        />
      </div>
      <div className="w-full md:w-80 flex flex-col gap-4">
        <GameInfo
          currentPlayer={gameState.currentPlayer}
          gameStatus={gameState.gameStatus}
          moveHistory={gameState.moveHistory}
          redCaptures={gameState.redCaptures}
          blackCaptures={gameState.blackCaptures}
        />
        <GameControls
          onReset={resetGame}
          onUndo={undoMove}
          canUndo={gameState.moveHistory.length > 0}
          gameStatus={gameState.gameStatus}
        />
      </div>
    </div>
  );
}
