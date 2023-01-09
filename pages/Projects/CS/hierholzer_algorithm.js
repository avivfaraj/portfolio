import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'

export default function Page() {
  return (
    <>
        <iframe src="/pdf/Hierholzer_algorithm_review.pdf" title="Eulerian Circuit Algorithm"></iframe>
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
