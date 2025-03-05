"use server";

export async function fetchSudoku() {
  try {
    const response = await fetch(
      "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution, difficulty}}}",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const grid = data.newboard.grids[0].value;
    const solution = data.newboard.grids[0].solution;
    const difficulty = data.newboard.grids[0].difficulty;
    return { grid, solution, difficulty };
  } catch (e) {
    console.error(e);
    return null;
  }
}
