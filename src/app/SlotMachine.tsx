"use client";
import React, { useState } from "react";

const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🔔"];

function SlotMachine() {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [score, setScore] = useState(100); // Initial credits

  // Function to handle the spin
  const spinReels = () => {
    const newReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setReels(newReels);
    updateScore(newReels);
  };

  // Function to get a random symbol for each reel
  const getRandomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  // Function to update the score based on reel results
  const updateScore = (newReels: any) => {
    const [first, second, third] = newReels;
    if (first === second && second === third) {
      setScore(score + 50); // All three match
    } else if (first === second || second === third || first === third) {
      setScore(score + 20); // Two match
    } else {
      setScore(score - 10); // No match
    }
  };

  return (
    <div className="text-2xl flex flex-col w-full gap-10">
      <div className="reels flex flex-row w-2/3 gap-5 justfiy-evenly self-center">
        {reels.map((symbol, index) => (
          <span
            key={index}
            className="reel bg-white/10 rounded-lg p-5 text-2xl gap-5"
          >
            {symbol}
          </span>
        ))}
      </div>
      <div className="controls">
        <button onClick={spinReels}>Spin 🎲</button>
      </div>
      <p>Score: {score}</p>
    </div>
  );
}

export default SlotMachine;
