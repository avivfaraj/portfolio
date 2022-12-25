import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import styles from '../styles/grid.module.css';
import Card from '../components/card';
import Projects from '../vars/home_proj';
import GithubCorner from 'react-github-corner';

export default function Index() {
  return (
    <section>
    <GithubCorner href="https://github.com/avivfaraj/portfolio" />
    <h2> Welcome </h2>
      <p> I am a Data Science Graduate Student at Drexel University. I have a dual Bachelor degree in 
      Physics & Electrical Engineering, and in this portfolio I aim to showcase a wide variety of projects in Data Science,
      Computer Science, Physics and Engineering. 
      </p>
    <div className={styles.container}>
          <h2> Sample Projects</h2>
          <div className={styles.grid}>
          {Projects.map(proj => (<Card {...proj} />))}
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

