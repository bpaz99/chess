import React, { useEffect } from "react";
import Board from "./components/board";
import { useChessStore } from "./components/stores/chess";
import { Button } from "./components/ui/button";
import Deck from "./components/Deck";

const App: React.FC = () => {
  const { initializeBoard, selectedPiece } = useChessStore();

  useEffect(() => {
    if (selectedPiece) {
      console.log(selectedPiece);
    }
  }, [selectedPiece]);

  useEffect(() => {
    initializeBoard("chess");
  }, []);

  return (
    <div className="min-h-screen bg-slate-400 flex flex-col items-center justify-center p-6">
      <div className="grid grid-cols-2 gap-4">
        <h1 className="text-3xl font-bold mb-6 col-span-2">Chess</h1>

        <div className="grid gap-4">
          <Board />
          <div className="flex">
            <Button onClick={() => initializeBoard("chess")}>
              Initialize Board
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-slate-500 p-4 rounded-lg w-[300px] md:w-[400px]">
          <p className="text-3xl font-bold">Pieces</p>
			<div className="grid md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold text-white">White</h1>
					<Deck variant="white" />
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Black</h1>
					<Deck variant="black" />
				</div>
			</div>
			<p className="text-sm text-gray-500">
				Click on a piece to select it.
			</p>
        </div>
      </div>

    </div>
  );
};

export default App;
