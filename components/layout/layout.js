import Head from "next/head";
import { Fragment } from "react";
import Sidebar from "../sidebar/sidebar";
import Styles from "./layout.module.css";
export default function Layout({ children }) {
  return (
    <Fragment>
      <Head>
        <title>Aviv Faraj | Data Scientist</title>
      </Head>
      <main className={Styles.main}>
        <aside className={Styles.sidebar}>
          <Sidebar />
        </aside>
        <div className={Styles.content}>{children}</div>
      </main>
    </Fragment>
  );
}
