import Head from "next/head";
import { Fragment, useContext } from "react";
import Sidebar from "../sidebar/sidebar";
import Styles from "./layout.module.css";
import Notification from "/components/ui/notification";
import NotificationContext from "/store/notification-context";

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
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
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
