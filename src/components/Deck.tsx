import { PIECES } from "@/lib/constants";
import { useChessStore } from "./stores/chess";
import { cn } from "@/lib/utils";
import { FaCrown, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from "react-icons/fa";
const Deck = ({ variant }: { variant: "white" | "black" }) => {
  const { selectPiece, selectedPiece, deselectPiece } = useChessStore();

  const getPieceIcon = (pieceName: string, variant: "white" | "black") => {
	const className = `text-2xl stroke-1 ${variant === "white" ? "text-white" : "text-black"}`

    switch (pieceName) {
      case "King":
        return <FaCrown className={className} />;
      case "Queen":
        return <FaChessQueen className={className} />;
      case "Rook":
        return <FaChessRook className={className} />;
      case "Bishop":
        return <FaChessBishop className={className} />;
      case "Knight":
        return <FaChessKnight className={className} />;
      case "Pawn":
        return <FaChessPawn className={className} />;
      default:
        return null;
    }
  };

  const pieces = PIECES.map((piece) => ({
    ...piece,
    color: variant,
    id: null,
    position: null,
    isInitialMove: true,
    icon: getPieceIcon(piece.name, variant),
  }));



  return (
    <div className="flex flex-col gap-2">
      {pieces.map((piece) => (
        <div
          key={piece.name}
          className={cn(
            "flex items-center gap-2 p-2 rounded-md cursor-pointer border border-transparent border-2 hover:border-primary",
            selectedPiece?.name === piece.name &&
              !selectedPiece.id &&
              selectedPiece.color === variant
              ? "border-primary border-2"
              : ""
          )}
          onClick={() => {
            if (selectedPiece) {
              deselectPiece();
            } else {
              selectPiece(piece);
            }
          }}
        >
          <h1>{piece.name}</h1>
          <p
            className={cn(
              "text-2xl",
              piece.color === "white" ? "text-white" : "text-black"
            )}
          >
            {piece.icon}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Deck;
