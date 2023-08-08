import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { ScheduleRoutineRow } from "~/components/schedule/ScheduleRoutineRow";
import { DateTime } from "luxon";
import { ScheduleRoutineForm } from "~/components/schedule/ScheduleRoutineForm";
import { api } from "~/utils/api";

const Schedule: NextPage = () => {
  const { data: routines } = api.routines.list.useQuery();

  console.log(routines);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between gap-4">
      <div className="flex w-full flex-1 flex-col items-center gap-4">
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
        <main className="flex max-w-7xl gap-4">
          <div className="grid w-1/2 auto-rows-fr gap-y-2">
            {routines &&
              routines.map((routine, index) => (
                <ScheduleRoutineRow
                  key={`routine-${index}`}
                  intervals={routine.intervals}
                  name={routine.name}
                  startTime={routine.startTime.toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}
                  duration={routine.duration}
                />
              ))}
          </div>
          <div className="flex h-min w-1/2 flex-col gap-4">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              {/* <ScheduleCurrentRoutine
                routine={
                  routines
                    ? scheduledRoutines[currentRoutineIndex]
                    : null
                }
              /> */}
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              {/* <ScheduleNextRoutine
                routine={
                  scheduledRoutines
                    ? scheduledRoutines[currentRoutineIndex + 1]
                    : null
                }
              /> */}
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <ScheduleRoutineForm />
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full pb-2">
        <p className="text-center font-thin tracking-wider text-gray-600">
          Copyright Ⓒ 2023 ToDanni. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Schedule;
