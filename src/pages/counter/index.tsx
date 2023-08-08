import { type NextPage } from "next";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Counter: NextPage = () => {
  const [size, setSize] = useState(500);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-green-100">
      <CountdownCircleTimer
        trailColor="#f0fdf4"
        size={size}
        colors={"#4ade80"}
        duration={300}
        isPlaying
      >
        {({ remainingTime }) => (
          <p className="px-1 text-5xl proportional-nums text-gray-500">
            {remainingTime}
          </p>
        )}
      </CountdownCircleTimer>
      <button
        className="rounded-lg bg-green-500 p-2 text-white"
        onClick={() => setSize(600)}
      >
        Increase size
      </button>
    </div>
  );
};

export default Counter;
