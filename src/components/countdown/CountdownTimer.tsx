import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CountdownTimer = () => {
  const minutes = (remainingTime: number) => Math.floor(remainingTime / 60);
  const seconds = (remainingTime: number) => remainingTime % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  const format = (remainingTime: number) =>
    `${pad(minutes(remainingTime))}:${pad(seconds(remainingTime))}`;

  return (
    <div>
      <CountdownCircleTimer
        trailColor="#f0fdf4"
        size={500}
        colors={"#4ade80"}
        duration={10}
        isPlaying
      >
        {({ remainingTime }) => (
          <p className="px-1 text-5xl proportional-nums text-gray-500">
            {format(remainingTime)}
          </p>
        )}
      </CountdownCircleTimer>{" "}
    </div>
  );
};
