import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import styles from '../styles/grid.module.css';
import Card from '../components/card';
import Projects from '../vars/projects';
Projects["cs"][0]["href"] = "./Projects/CS/todocomPage";

export default function Index() {
  return (
    <section>
    <h2> Welcome </h2>
      <p> I am a Data Science Graduate Student at Drexel University. I have a dual Bachelor degree in 
      Physics & Electrical Engineering, and in this portfolio I aim to showcase a wide variety of projects in Data Science,
      Computer Science, Physics and Engineering. 
      </p>
    <div className={styles.container}>
          <h2> Sample Projects</h2>
          <div className={styles.grid}>
          {Projects.hasOwnProperty("ds") && (<Card {...Projects["ds"][0]} />)}
          {Projects.hasOwnProperty("ds") && (<Card {...Projects["ds"][2]} />)}
          {Projects.hasOwnProperty("cs") && (<Card {...Projects["cs"][0]} />)}
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

