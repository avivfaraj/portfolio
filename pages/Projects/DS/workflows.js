import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'

export default function Page() {
  return (
    <>
        <iframe src="/pdf/workflows.pdf" title="Clustering using Orange workflows"></iframe>
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
