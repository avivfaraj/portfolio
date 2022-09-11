import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import styles from '../styles/grid.module.css'
import Card from '../components/card'
import Projects from '../vars/projects'

export default function Index() {
  return (
    <section>
    <div className={styles.container}>
          <h2> Projects</h2>
          <div className={styles.grid}>
          {Projects.hasOwnProperty("ds") && (<Card {...Projects["ds"][0]} />)}
          {Projects.hasOwnProperty("ds") && (<Card {...Projects["ds"][2]} />)}
          {Projects.hasOwnProperty("cs") && (<Card {...Projects["cs"][0]} />)}
          </div>
    </div>
    </section>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}

