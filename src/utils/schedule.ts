import { type Interval } from "~/schemas/timer";

const getTimerSchedule = () => {
  const schedule = localStorage.getItem("schedule");

  if (schedule) {
    console.log(JSON.parse(schedule));
  } else {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const timerSchedule: Interval[] = JSON.parse(schedule);
  return timerSchedule;
};

const setTimerSchedule = () => {
  const schedule: Interval[] = [
    { name: "Work", duration: 25 },
    { name: "Break", duration: 5 },
    { name: "Work", duration: 25 },
    { name: "Break", duration: 5 },
    { name: "Work", duration: 25 },
    { name: "Break", duration: 5 },
    { name: "Work", duration: 25 },
    { name: "Break", duration: 5 },
  ];

  localStorage.setItem("schedule", JSON.stringify(schedule));
};

const getCurrentInterval = (interval: number) => {
  const schedule = getTimerSchedule();

  if (schedule.length === 0) {
    return {
      name: "Work",
      duration: 25,
    };
  }
  return schedule[interval];
};

export { getTimerSchedule, setTimerSchedule, getCurrentInterval };
