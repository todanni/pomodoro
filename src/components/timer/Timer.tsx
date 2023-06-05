import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { TimerControls } from "./TimerControls";
import { DateTime } from "luxon";
import useSound from "use-sound";
import { CardContainer } from "../containers/CardContainer";
import { TimerDateTime } from "./TimerDateTime";
import { TimerStartEnd } from "./TimerStartEnd";
import { useEffect, useState } from "react";
import { type Interval } from "~/schemas/timer";

type TimerProps = {
  interval: Interval | undefined;
  onIntervalEnd: () => void;
};

type TimerSettings = {
  duration: number;
  isPlaying: boolean;
};

export const Timer = ({ interval, onIntervalEnd }: TimerProps) => {
  const [play] = useSound("/notification.mp3", { volume: 0.25 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>({
    duration: 25 * 60,
    isPlaying: false,
  });

  useEffect(() => {
    if (interval) {
      setSettings({
        duration: interval.duration * 60,
        isPlaying: isPlaying,
      });
    }
  }, [interval, isPlaying]);

  const onComplete = () => {
    play();
    onIntervalEnd();
    return { shouldRepeat: true };
  };

  return (
    <CardContainer>
      <div className="flex flex-col justify-between">
        <TimerDateTime />
        <div className="flex min-w-[500px] justify-center">
          <CountdownCircleTimer
            trailColor="#f0fdf4"
            size={500}
            {...settings}
            colors={"#4ade80"}
            onComplete={() => onComplete()}
          >
            {({ remainingTime }) => (
              <TimerControls
                remainingTime={remainingTime}
                name={interval ? interval.name : "Finished!"}
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
