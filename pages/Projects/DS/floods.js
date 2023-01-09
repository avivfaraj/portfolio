import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'

export default function Page() {
  return (
    <>
        <iframe src="/pdf/floods-visualization.pdf" title="Floods visualization using Tableau Public"></iframe>
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
