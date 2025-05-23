export type CellType = {
	row: number;
	col: number;
	piece: PieceType | null;
}

export type PieceType = {
	id: string | null;
	name: string;
	icon: React.ReactNode | null;
	color: string;
	validMoves: {x: number, y: number}[] | null;
	position: {
		row: number;
		col: number;
	} | null;
	isInitialMove: boolean;
}

export type PossibleBoardsType = "empty" | "chess"; // TBI