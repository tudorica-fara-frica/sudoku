import Grid from "@/components/grid";
import Title from "@/components/title";
import { fetchSudoku } from "@/lib/utils";
import { connection } from "next/server";

export default async function Home() {
  await connection();

  const { grid, solution, difficulty } = await fetchSudoku();

  return (
    <div className="size-full flex flex-col justify-center items-center gap-3">
      <Title />
      <Grid grid={grid} solution={solution} diff={difficulty} />
    </div>
  );
}
