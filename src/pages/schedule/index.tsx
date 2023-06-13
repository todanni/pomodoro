import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { ScheduleRoutineRow } from "~/components/schedule/ScheduleRoutineRow";
import { getScheduleTimes } from "~/schemas/schedule";
import { DateTime } from "luxon";

const Schedule: NextPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Head>
        <title>Schedule | ToDanni</title>
        <meta name="description" content="ToDanni Countdown timer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex w-full justify-center pt-4">
        <Image
          src={logo}
          alt="ToDanni Logo"
          className="h-8 w-min object-scale-down"
        />
      </header>
      <main className="h-full">
        <div className="grid w-1/2 auto-rows-fr gap-y-4 px-8">
          {getScheduleTimes().map((routine, index) => (
            <ScheduleRoutineRow
              key={`routine-${index}`}
              rowSpan={routine.rows}
              rowStart={routine.rowStart}
              name={routine.name}
              startTime={routine.startTime.toLocaleString(DateTime.TIME_SIMPLE)}
              duration={routine.duration}
            />
          ))}
        </div>
      </main>
      <footer className="w-full pb-2">
        <p className="text-center font-thin tracking-wider text-gray-600">
          Copyright Ⓒ 2023 ToDanni. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Schedule;
