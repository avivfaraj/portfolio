import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/grid.module.css'
import Card from '/components/card'
import Projects from '/vars/projects'

export default function DSHome() {
  return (
    <section>
        <div className={Styles.gap}/>

        <div className={Styles.container}>
            <h2> Engineering Projects</h2>
            <div className={Styles.grid}>
              {Projects["ee"].map(ee =>(
                <Card {...ee} />
              ))}

            </div>

        </div>
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
