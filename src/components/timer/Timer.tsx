import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { TimerControls } from "./TimerControls";
import { DateTime } from "luxon";
import useSound from "use-sound";
import { CardContainer } from "../containers/CardContainer";
import { TimerDateTime } from "./TimerDateTime";
import { TimerStartEnd } from "./TimerStartEnd";
import { useState } from "react";
import { type Interval } from "~/schemas/timer";

type TimerProps = {
  interval: Interval;
  intervalIndex: number;
  onComplete: () => void;
  repeat: boolean;
};

export const Timer = ({
  interval,
  intervalIndex,
  repeat,
  onComplete,
}: TimerProps) => {
  // Timer state is controlled by start and stop buttons
  const [isPlaying, setIsPlaying] = useState(false);

  // Play notification sound on complete
  const [play] = useSound("/notification.mp3", { volume: 0.1 });

  return (
    <CardContainer>
      <div className="flex h-full flex-col justify-between">
        <TimerDateTime />
        <div className="flex min-w-[500px] justify-center">
          <CountdownCircleTimer
            key={intervalIndex}
            trailColor="#f0fdf4"
            size={500}
            duration={interval.duration * 60}
            isPlaying={isPlaying}
            colors={"#4ade80"}
            onComplete={() => {
              play();
              onComplete();
              setIsPlaying(repeat);
              return {
                shouldRepeat: repeat,
              };
            }}
          >
            {({ remainingTime }) => (
              <TimerControls
                remainingTime={remainingTime}
                name={interval.name}
                onStart={() => setIsPlaying(true)}
                onStop={() => setIsPlaying(false)}
              />
            )}
          </CountdownCircleTimer>
        </div>
        {/* TODO: Pass the correct dates from calculations */}
        <TimerStartEnd start={DateTime.now()} end={DateTime.now()} />
      </div>
    </CardContainer>
  );
};
