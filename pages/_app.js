import Head from "next/head";
import Layout from "/components/layout/layout";
import "/styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default MyApp;
