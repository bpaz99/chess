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
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center p-6">
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

        <div className="grid grid-cols-2 gap-4">
          <h1 className="col-span-2">Pieces</h1>
          <div className="flex flex-col gap-2">
            <Deck variant="white" />
            <Deck variant="black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
