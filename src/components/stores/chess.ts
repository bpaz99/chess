import type {
  CellType,
  PossibleBoardsType,
  PieceType,
} from "@/types";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { computeValidMoves } from "@/lib/utils";

type ChessStore = {
  board: CellType[][];
  initializeBoard: (type: PossibleBoardsType) => void;
  getCell: (row: number, col: number) => CellType;
  selectedPiece: PieceType | null;
  deselectPiece: () => void;
  selectPiece: (piece: PieceType) => void;
  placePieceOnBoard: (cell: CellType) => void;
  movePiece: (cell: CellType) => void;
};

export const useChessStore = create<ChessStore>((set, get) => ({
  board: [],
  initializeBoard: (type = "empty") => {
    const board = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => ({
        row,
        col,
        piece: null,
        selected: false,
      }))
    );

    set({ board });
  },
  getCell: (row: number, col: number) => {
    return get().board[row][col];
  },
  selectedPiece: null,
  deselectPiece: () => set({ selectedPiece: null }),
  selectPiece: (piece: PieceType) => set({ selectedPiece: piece }),
  placePieceOnBoard: (cell: CellType) => {
    // We use this method for manual placing of pieces
    const selectedPiece = get().selectedPiece;
    // Do we have a piece selected from the deck?
    if (!selectedPiece || selectedPiece?.id || selectedPiece.position) return;
    // Place piece on board
    set({
      board: get().board.map((row) =>
        row.map((c) =>
          c.row === cell.row && c.col === cell.col
            ? {
                ...c,
                piece: {
                  ...selectedPiece,
                  id: nanoid(2),
                  position: {
                    row: cell.row,
                    col: cell.col,
                  },
                  validMoves: computeValidMoves(selectedPiece, {
                    x: cell.row,
                    y: cell.col,
                  }),
                },
              }
            : c
        )
      ),
    });
    // Deselect piece
    set({ selectedPiece: null });
  },
  movePiece: (cell: CellType) => {
    console.log("moving piece", cell);

    if (cell.piece) return; // Cannot move onto a piece

    if (!get().selectedPiece) return;

    const selectedPiece = get().selectedPiece;
    if (!selectedPiece || !selectedPiece?.id || !selectedPiece.position) return;

    // Check if the move is valid
    if (
      !selectedPiece.validMoves?.some(
        (move) => move.x === cell.row && move.y === cell.col
      )
    )
      return;

    // Move the piece

    const board = get().board;
    board[selectedPiece.position.row][selectedPiece.position.col].piece = null;
    board[cell.row][cell.col].piece = selectedPiece;

    selectedPiece.position = {
      row: cell.row,
      col: cell.col,
    };

    selectedPiece.isInitialMove = false;

    selectedPiece.validMoves = computeValidMoves(selectedPiece, {
      x: cell.row,
      y: cell.col,
    });

    set({ board });
    set({ selectedPiece: null });
  },
}));
