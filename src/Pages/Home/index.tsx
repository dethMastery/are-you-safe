import { useState } from "react";

export const HomePage = () => {
  const [dice, setDice] = useState<number>(0);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl">Are you safe?</h1>
      <select
        name="dice"
        id="dice"
        onChange={(e) => setDice(Number(e.target.value))}
        className="border-2 border-solid border-whitesmoke rounded-xl p-4 outline-0 focus:border-living-coral"
      >
        <option value="6">D6</option>
        <option value="20">D20</option>
      </select>
      <a
        className="bg-living-coral p-4 rounded-xl hover:opacity-60"
        href={`game?dice=${dice}`}
      >
        Start
      </a>
    </div>
  );
};
