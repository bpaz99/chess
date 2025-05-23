import { useChessStore } from "./stores/chess";
import Cell from "./Cell";

const Board = () => {
	const {board} = useChessStore();

	return ( 
		<div className="flex flex-col items-center justify-center">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((cell) => (
						<Cell key={`${cell.row}-${cell.col}`} x={cell.row} y={cell.col} />
					))}
				</div>
			))}
		</div>
	);
}
 
export default Board;