"use client";

import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Grid({ grid, solution, diff }) {
  const [gridCopy, setGridCopy] = useState(grid);
  const inputRef = useRef(null);
  const inputRefCoords = useRef(null);

  function changeGrid(row, col, val) {
    const numericVal = parseInt(val, 10);
    const newGrid = gridCopy.map((line, rowIndex) => {
      if (rowIndex === row) {
        return line.map((item, colIndex) => {
          if (colIndex === col) {
            if (isNaN(numericVal) || numericVal < 1 || numericVal > 9) {
              return 0;
            }
            return numericVal;
          }
          return item;
        });
      }
      return line;
    });
    setGridCopy(newGrid);
  }

  function handleCompare() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (gridCopy[i][j] !== solution[i][j]) {
          toast.error("Ohh please...");
          return;
        }
      }
    }
    toast.success("GENIUS!!");
  }

  function handleCompareItem() {
    if (inputRef.current && inputRefCoords.current) {
      const { row, col } = inputRefCoords.current;
      const solutionValue = solution[row][col];
      const inputValue = parseInt(inputRef.current.value, 10);
      if (inputValue === solutionValue) {
        toast("Good Job!", {
          icon: "👏",
        });
      } else {
        toast.error("Nope!");
      }
    } else {
      toast("Please select a box!", {
        icon: "🙏",
      });
    }
  }

  return (
    <>
      <Toaster containerClassName="text-lg" />
      <p className="text-lg">{diff}</p>
      <div className="flex flex-col gap-1 border size-fit p-2 rounded-md bg-indigo-900">
        {gridCopy.map((line, index) => (
          <div key={index} className="flex flex-row gap-1">
            {line.map((item, i) => (
              <input
                className={`rounded-sm bg-transparent text-2xl size-12 place-items-center border-white focus:outline-0 disabled:text-blue-500 disabled:bg-indigo-950
                ${item === 0 ? "text-lg" : "text-amber-500 font-semibold"}
                ${i % 3 === 0 && i !== 0 ? "border-l-4" : ""} 
                ${index % 3 === 2 && index !== 8 ? "border-b-4" : ""}
                `}
                key={i}
                value={item}
                disabled={grid[index][i] !== 0}
                onChange={(e) => changeGrid(index, i, e.target.value)}
                onFocus={(e) => {
                  inputRef.current = e.target;
                  inputRefCoords.current = { row: index, col: i };
                }}
                onBlur={() => {
                  inputRef.current = null;
                  inputRefCoords.current = null;
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="items-stretch flex flex-row gap-2">
        <button
          className="text-white bg-indigo-950 font-semibold text-2xl py-2 px-4 rounded-md cursor-pointer"
          onClick={handleCompare}
        >
          check grid
        </button>
        <button
          className="text-white bg-indigo-950 font-semibold text-2xl py-2 px-4 rounded-md cursor-pointer"
          onMouseDown={handleCompareItem}
        >
          check box
        </button>
      </div>
    </>
  );
}
