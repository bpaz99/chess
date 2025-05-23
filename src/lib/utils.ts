import type { PieceType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function computeValidMoves(
  piece: PieceType,
  position: { x: number; y: number }
): { x: number; y: number }[] | null {
  // Get piece type

  // For pieces with move that are easy: eg: Knight, Pawn, King, I decided to do it this way to save time

  if (piece.name === "Knight") {
    // Knight moves
    const moves = [
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 },
    ];

    // Calculate valid moves
    const validMoves = moves.map((move) => ({
      x: position.x + move.x,
      y: position.y + move.y,
    }));

    return validMoves;
  }

  if (piece.name === "Pawn") {
    // Pawn moves
    const direction = piece.color === "white" ? 1 : -1;

    const moves = piece.isInitialMove
      ? [
          { x: direction * 2, y: 0 },
          { x: direction * 1, y: 0 },
        ]
      : [
          { x: direction * 1, y: 1 },
          { x: direction * 1, y: -1 },
        ];

    // Calculate valid moves
    const validMoves = moves.map((move) => ({
      x: position.x + move.x,
      y: position.y + move.y,
    }));

    return validMoves;
  }

  if (piece.name === "Bishop") {
    // We must create a diagonal movement
    const validMoves = [];
    // From position create a diagonal movement
    const directions = [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ];

    // For each direction, generate moves up to 8 squares
    for (const direction of directions) {
      for (let i = 1; i <= 8; i++) {
        const newX = position.x + direction.x * i;
        const newY = position.y + direction.y * i;

        // Check if the move is within board bounds (0-7)
        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          validMoves.push({ x: newX, y: newY });
        } else {
          break;
        }
      }
    }

    return validMoves;
  }

  if (piece.name === "Rook") {
    // Rook moves
    const validMoves = [];
    // From position create a vertical and horizontal movement
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 8; i++) {
        const newX = position.x + direction.x * i;
        const newY = position.y + direction.y * i;

        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          validMoves.push({ x: newX, y: newY });
        } else {
          break;
        }
      }
    }

    return validMoves;
  }

  if (piece.name === "Queen") {
    // Queen moves
    const validMoves = [];
    // From position create a diagonal, vertical and horizontal movement
    const directions = [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    for (const direction of directions) {
      for (let i = 1; i <= 8; i++) {
        const newX = position.x + direction.x * i;
        const newY = position.y + direction.y * i;

        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          validMoves.push({ x: newX, y: newY });
        } else {
          break;
        }
      }
    }

    return validMoves;
  }

  if (piece.name === "King") {
    // King moves
    const moves = [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    const validMoves = moves.map((move) => ({
      x: position.x + move.x,
      y: position.y + move.y,
    }));

    return validMoves;
  }

  return null;
}
