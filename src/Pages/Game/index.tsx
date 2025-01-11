import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const GamePage = () => {
  const [searchParam, _setSearchParam] = useSearchParams();

  const [live, setLive] = useState<number>(3);
  const [deadLine, setDeadLine] = useState<number>(
    Math.floor(Math.random() * Number(searchParam.get("dice"))) + 1
  );
  const [count, setCount] = useState<number>(0);

  const [isHit, setHit] = useState<boolean>(false);
  const [isTurnChange, setTurnChange] = useState<boolean>(false);
  const [runAnimation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (!isTurnChange) {
      console.log(count);
      console.log(deadLine);

      setTimeout(() => {
        setAnimation(false);

        if (isHit) {
          setHit(false);
          setCount(0);
          setLive(live - 1);
          resetDead();
        }
      }, 200);
    } else {
      resetDead();
      setCount(0);
      setTurnChange(false);
    }
  }, [count, isTurnChange]);

  const resetDead = () => {
    setDeadLine(
      Math.floor(Math.random() * Number(searchParam.get("dice"))) + 1
    );
  };

  const updateCount = () => {
    setCount(count + 1);
    setAnimation(true);

    if (count >= deadLine) {
      setHit(true);
    }
  };

  const turnChange = () => {
    setTurnChange(true);
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
        {[...Array(live)].map((_e, i) => {
          return <div key={i} className="w-full h-[2rem] bg-amber-100"></div>;
        })}
      </div>
      <button
        className={`w-full h-full absolute top-0 left-0 z-10 ${
          runAnimation ? (isHit ? "bg-red-700" : "bg-living-coral") : ""
        }`}
        onClick={() => updateCount()}
      ></button>

      <button
        className="bg-red-700 text-whitesmoke p-4 absolute z-20 right-4 bottom-4 hover:opacity-60 rounded-xl"
        onClick={() => turnChange()}
      >
        Turn Change
      </button>

      <div
        className={`w-full h-screen z-30 top-0 left-0 bg-[#fe0000] flex flex-col justify-center items-center gap-4 ${
          live == 0 ? "absolute" : "hidden"
        }`}
      >
        <h1 className="text-5xl">Game Over</h1>

        <button className="px-2 py-4 bg-[#0d6efd] text-whitesmoke rounded hover:opacity-60">
          Restart?
        </button>
        <a
          className="px-2 py-4 bg-[#ffc107] text-whitesmoke rounded hover:opacity-60"
          href="/"
        >
          Back to Menu
        </a>
      </div>
    </div>
  );
};
