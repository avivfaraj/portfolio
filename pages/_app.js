import Head from "next/head";
import Layout from "/components/layout/layout";
import "/styles/global.css";
import Sidebar from "/components/sidebar/sidebar";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <Sidebar /> */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
