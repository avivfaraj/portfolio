import Head from "next/head";
import { Fragment } from "react";
import Sidebar from "../sidebar/sidebar";
import Styles from "./layout.module.css";
export default function Layout({ children }) {
  return (
    <Fragment>
      <Head>
        <title>Aviv Faraj | Data Scientist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta description="Aviv Faraj Portfolio." />
      </Head>
      <main className={Styles.main}>
        <aside>
          <Sidebar />
        </aside>
        {children}
      </main>
    </Fragment>
  );
}
