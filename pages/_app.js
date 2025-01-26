import Head from "next/head";
import Layout from "/components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import "/styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
