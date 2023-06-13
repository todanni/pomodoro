export type TimeOption = {
  label: string;
  value: number;
};

const minutesOptions: TimeOption[] = [
  {
    label: "00",
    value: 0,
  },
  {
    label: "15",
    value: 15,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "45",
    value: 45,
  },
];

const hourOptions = () => {
  const hours: TimeOption[] = [];
  for (let i = 0; i < 13; i++) {
    hours.push({
      label: i.toString().padStart(2, "0"),
      value: i,
    });
  }
  return hours;
};

export { minutesOptions, hourOptions };
