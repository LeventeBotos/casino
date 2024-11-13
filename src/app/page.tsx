import React from "react";
import SlotMachine from "./SlotMachine";

function App() {
  return (
    <div className="flex flex-col items-center justify-evenly bg-black min-h-screen ">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">
        Casino Slot Machine 🎰
      </h1>
      <SlotMachine />
    </div>
  );
}

export default App;
