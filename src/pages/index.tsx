import { Navbar } from "@todanni/ui";
import { type NextPage } from "next";
import Head from "next/head";
import { Countdown } from "~/components/Countdown";
import { Tasks } from "~/components/Tasks";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomodoro | ToDanni</title>
        <meta name="description" content="ToDanni Pomodoro timer with tasks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center p-8">
        <Countdown isPlaying={false} duration={60} />
        <Tasks />
      </main>
    </>
  );
};

export default Home;
