import Layout from '/components/layout';
import Sidebar from '/components/sidebar';
import Styles from '/styles/layout.module.css';
import GithubCorner from 'react-github-corner';

export default function Capstone() {
  return (
    <>
        
        <iframe src="https://joeyloganpython.github.io/Capstone/" title="MSDS - Capstone Project"></iframe>
        <GithubCorner href={"https://github.com/Joeyloganpython/Capstone"} svgStyle={{"mixBlendMode":"darken"}}/>
    </>
  ) 
}

Capstone.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
