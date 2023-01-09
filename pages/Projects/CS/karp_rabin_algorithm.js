import Layout from '/components/layout'
import Sidebar from '/components/sidebar'
import Styles from '/styles/layout.module.css'
import GithubCorner from 'react-github-corner'

export default function Page() {
  return (
    <>
        <iframe src="/pdf/karp_rabin_algorithm_review.pdf" title="String matching algorithm" height="90%"></iframe>
        <GithubCorner href="https://github.com/avivfaraj/Data-Structures-and-Algorithms/blob/main/Algorithms/General/Karp-Rabin.py" />
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
