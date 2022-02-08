import type { NextPage } from "next";
import Head from "next/head";
import ResponsiveAppBar from "../components/MainAppBar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TASK TASK</title>
        <meta name="description" content="Task Task Work Request System" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar />
    </div>
  );
};

export default Home;
