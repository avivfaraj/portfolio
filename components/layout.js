import Head from 'next/head'
import Styles from '/styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Aviv Faraj | Data Scientist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta description="Aviv Faraj Portfolio." />
      </Head>
      <main className={Styles.main}>{children}</main>
    </>
  )
}
