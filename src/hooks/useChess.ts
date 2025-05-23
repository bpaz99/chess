import { useState } from "react";

type Board = number[][];




// ✅ Hook
export function useSudoku(initialClues = 35) {
  const [board, setBoard] = useState<Board>(
    () => removeCells(generateFullBoard(), initialClues)
  );

  const generateFullBoard = () => {}

  const generatePuzzle = (clues = 35) => {
 
  };

  const solve = () => {

  };

  return {
    board,
    generatePuzzle,
    solve,
  };
}
