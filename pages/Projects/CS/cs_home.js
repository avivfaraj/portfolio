import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar'
import styles from '../../../styles/grid.module.css'
import Card from '../../../components/card'
import Projects from '../../../vars/projects'

export default function CSHome() {
  return (
    <section>
        <div className={styles.container}>
         <h2> Computer Science Projects</h2>
          <div className={styles.grid}>
          {Projects.hasOwnProperty("cs") && (Projects["cs"].map(cs =>(
                <Card {...cs} />
          )))}
          </div>

        </div>
    </section>
  )
}

CSHome.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
