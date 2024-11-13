"use client";
import React, { useState, useEffect } from "react";

const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🔔", "❓"] as const;
const payouts: Record<string, number> = {
  "🍒": 10,
  "🍋": 15,
  "🍉": 20,
  "🍇": 25,
  "⭐": 100,
  "🔔": 200,
};

// Initial probabilities, higher chances of winning at the start
const baseWeights = [0.35, 0.3, 0.2, 0.1, 0.04, 0.01];
const minWeights = [0.45, 0.4, 0.1, 0.03, 0.01, 0.01]; // Reduced chances for harder difficulty when balance is low

type Symbol = (typeof symbols)[number];

function SlotMachine() {
  const [reels, setReels] = useState<Symbol[]>(["❓", "❓", "❓"]);
  const [balance, setBalance] = useState<number>(100);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isWinning, setIsWinning] = useState<boolean>(false);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [showAd, setShowAd] = useState<boolean>(false);

  // Helper function to get a random symbol based on weights
  const getRandomSymbol = (): Symbol => {
    const rand = Math.random();
    const currentWeights = balance > 20 ? baseWeights : minWeights; // If balance is low, use reduced chances
    let cumulative = 0;
    for (let i = 0; i < symbols.length; i++) {
      cumulative += currentWeights[i];
      if (rand < cumulative) return symbols[i];
    }
    return symbols[symbols.length - 1]; // Fallback to last symbol
  };

  const spinReels = () => {
    if (balance <= 0) {
      setShowAd(true);
      return;
    }

    setIsSpinning(true);
    setIsWinning(false);
    setWinAmount(0);
    setBalance(balance - 35); // Deduct a spin cost

    setTimeout(() => {
      const newReels: Symbol[] = [
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol(),
      ];
      setReels(newReels);
      calculateWin(newReels);
      setIsSpinning(false);
    }, 1000);
  };

  const calculateWin = (newReels: Symbol[]) => {
    const [first, second, third] = newReels;
    if (first === second && second === third) {
      const win = payouts[first] * 3;
      setBalance(balance + win);
      setWinAmount(win);
      setIsWinning(true);
    } else if (first === second || second === third || first === third) {
      const matchSymbol =
        first === second ? first : second === third ? second : third;
      const win = payouts[matchSymbol] * 2;
      setBalance(balance + win);
      setWinAmount(win);
      setIsWinning(true);
    }
  };

  const watchAd = () => {
    setBalance(20); // Give a small balance after watching an ad
    setShowAd(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isSpinning) {
        spinReels();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSpinning]);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg slot-machine-container">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        Casino Slot Machine 🎰
      </h1>
      <div className="flex justify-center mb-4">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className={`text-5xl mx-2 ${isSpinning ? "reel-spin" : ""} ${
              isWinning && winAmount > 0 ? "win-flash" : ""
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={spinReels}
          disabled={isSpinning}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
        >
          {isSpinning ? "Spinning..." : "Spin 🎲"}
        </button>
      </div>
      <p className="text-center text-xl font-bold">Balance: ${balance}</p>
      {isWinning && winAmount > 0 && (
        <p className="text-center text-2xl text-green-500 font-bold mt-4 animate-pulse">
          You won ${winAmount}!
        </p>
      )}
      {showAd && (
        <div className="text-center mt-6">
          <button
            onClick={watchAd}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Watch Ad to Get $20
          </button>
        </div>
      )}
    </div>
  );
}

export default SlotMachine;
