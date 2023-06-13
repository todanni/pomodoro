import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { ScheduleEventForm } from "~/components/schedule/ScheduleEventForm";
import { CardContainer } from "~/components/containers/CardContainer";
import { useEffect } from "react";
import { getScheduleTimes } from "~/schemas/schedule";
import { DateTime } from "luxon";

const Schedule: NextPage = () => {
  useEffect(() => {
    const printable = getScheduleTimes().map((routine) => {
      return {
        name: routine.name,
        startTime: routine.startTime.toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime: routine.endTime.toLocaleString(DateTime.TIME_24_SIMPLE),
        duration: routine.duration,
        rowSpan: routine.rows,
        // TODO: this should be rowStart
        rowStart: routine.rowStart,
      };
    });
    console.table(printable);
  }, []);

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
      <main className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="grid w-11/12 grid-cols-3 gap-4">
          <div className="col-span-3">
            <CardContainer>
              <h1 className="text-center text-lg font-bold tracking-wider text-gray-600">
                Tuesday, 13th of June
              </h1>
            </CardContainer>
          </div>
          <div className="col-span-2">
            <CardContainer>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold text-gray-700">
                  Routines
                </h1>
              </div>
            </CardContainer>
          </div>
          <CardContainer>
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-lg font-semibold text-gray-700">
                Add to schedule
              </h1>
              <ScheduleEventForm />
            </div>
          </CardContainer>
        </div>
        <div className="grid w-11/12 auto-rows-fr grid-cols-1 gap-4">
          {getScheduleTimes().map((routine, index) => (
            <ScheduleEventRow
              key={index}
              rowSpan={routine.rows}
              rowStart={routine.rowStart}
              time={routine.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
              title={routine.name}
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

type ScheduleEventRowProps = {
  rowSpan: number;
  rowStart: number;
  time: string;
  title: string;
  duration: string;
};

const ScheduleEventRow = ({
  rowSpan,
  rowStart,
  time,
  title,
  duration,
}: ScheduleEventRowProps) => {
  return (
    <div
      className={`row-span-${rowSpan} flex w-full gap-4 rounded-xl bg-white p-4 shadow-lg`}
    >
      <p className="font-bold text-gray-600">{time}</p>
      <p className="flex-1 text-gray-600">{title}</p>
      <p className="font-thin text-gray-500">{duration}</p>
    </div>
  );
};

export default Schedule;
