import Head from 'next/head'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Aviv Faraj | Data Scientist</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}
