import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/grid.module.css'
import Card from '/components/card'
import Projects from '/vars/projects'

export default function DSHome() {
  return (
    <section>

        <div className={Styles.gap} />

        <div className={Styles.container}>
            <h1> Data Science Projects</h1>
            <div className={Styles.grid}>
              {Projects["ds"].map(ds =>(
                <Card {...ds} />
              ))}

            </div>

        </div>

        <div className={Styles.gap} />
    </section>
  )
}

DSHome.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
