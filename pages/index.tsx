import { Breadcrumb, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TASK TASK</title>
        <meta name="description" content="Task Task Work Request System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
