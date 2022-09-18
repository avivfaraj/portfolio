import Head from 'next/head'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Aviv Faraj | Data Scientist</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}
