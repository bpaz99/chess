import { useEffect, useState } from "react";
import { useChessStore } from "./stores/chess";
import { cn } from "@/lib/utils";
const rowAlias = ["A", "B", "C", "D", "E", "F", "G", "H"];
const colAlias = [1, 2, 3, 4, 5, 6, 7, 8];

const Cell = ({ x, y }: { x: number; y: number }) => {
  const { getCell, selectPiece, placePieceOnBoard, selectedPiece, movePiece } =
    useChessStore((state) => state);
  const isDark = (x + y) % 2 === 0;
  const cell = getCell(x, y);
  const [isSelected, setIsSelected] = useState(false);
  const [isPossibleMove, setIsPossibleMove] = useState(false);

  useEffect(() => {
    if (selectedPiece && selectedPiece.id) {
      setIsPossibleMove(
        selectedPiece.validMoves?.some(
          (move) => move.x === x && move.y === y
        ) || false
      );
    } else {
      setIsPossibleMove(false);
      setIsSelected(false);
    }
  }, [selectedPiece]);

  const clickHandler = () => {
    // If piece is selected, attempt to place on cell
    if (selectedPiece && !selectedPiece.id) {
      placePieceOnBoard(cell);
      return;
    }

    // If cell has piece, select piece
    if (cell.piece) {
      selectPiece(cell.piece);
      setIsSelected(true);
    }

    if (selectedPiece && selectedPiece.id) {
      movePiece(cell);
    }
  };

  useEffect(() => {
    if (selectedPiece) {
      setIsPossibleMove(
        selectedPiece.validMoves?.some(
          (move) => move.x === x && move.y === y
        ) || false
      );
    }
  }, [selectedPiece]);

  return (
    <div
      className={cn(
        "w-20 h-20 border border-black border-2 flex flex-col items-center justify-center relative",
        isDark ? "bg-gray-400" : "bg-gray-800",
        isSelected ? "border-2 border-blue-500 bg-blue-500/20" : "",
        isPossibleMove ? "bg-green-500/20" : ""
      )}
      onClick={clickHandler}
    >
      <span className="text-gray-500 text-xs absolute top-1 left-1">
        {rowAlias[x]}
        {colAlias[y]}
      </span>
      {cell.piece && (
        <div
          className={cn(
            "text-gray-500 text-xl font-bold",
            cell.piece.color === "white" ? "text-white" : "text-black"
          )}
        >
          {cell.piece.icon}
        </div>
      )}
      {/* Here we can do a border depending on the state of the cell */}
    </div>
  );
};

export default Cell;
