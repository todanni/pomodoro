import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/logo.png";
import {
  CountdownForm,
  type CountdownSchema,
} from "~/components/countdown/CountdownForm";
import { useEffect, useState } from "react";
import { CountdownTimer } from "~/components/countdown/CountdownTimer";

const Countdown: NextPage = () => {
  const [deadlines, setDeadlines] = useState<CountdownSchema[]>([]);

  useEffect(() => {
    const currentBudget = localStorage.getItem("deadlines");
    if (currentBudget) {
      console.log(JSON.parse(currentBudget));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsedBudget: CountdownSchema[] = JSON.parse(currentBudget);
      setDeadlines(parsedBudget);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col gap-4">
      <Head>
        <title>Countdown | ToDanni</title>
        <meta name="description" content="ToDanni Countdown timer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex w-full items-center justify-center pt-4">
        <Image
          src={logo}
          alt="ToDanni Logo"
          className="h-8 object-scale-down"
        />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 lg:flex-none">
        <CountdownForm />
        {deadlines.map((deadline, index) => (
          <div key={`${deadline.name}-${index}`} className="flex gap-2">
            <CountdownTimer />
          </div>
        ))}
      </main>
      <footer className="w-full pb-2">
        <p className="text-center font-thin tracking-wider text-gray-600">
          Copyright Ⓒ 2023 ToDanni. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Countdown;
