import Layout from '/components/layout';
import Sidebar from '/components/sidebar';
import Styles from '/styles/layout.module.css'

export default function Index() {
  return (
    <>
        <div className={Styles.gap}></div>
        <iframe src="https://rdcu.be/b5Vhh" title="Automated, Convenient and Compact Auto-correlation Measurement for an Ultra-fast Laser Pulse"></iframe>
    </>
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
