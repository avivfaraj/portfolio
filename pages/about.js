import Layout from '../components/layout'
import Sidebar from '../components/sidebar'

export default function About() {
  return (
    <section>
      <h5> Data Science Graduate Student at Drexel Univeristy 
      <br></br> <br></br>
      Member of Drexel Chapter of Upsilon Pi Epsilon (UPE)</h5>
      <p>
        I followed my passion for Mathematics and Quantum Computing by pursuing a dual Bachelor of Science
        in Physics and Electrical Engineering from Ariel University. During my undergraduate studies
        I developed critical thinking, problem solving and programming skills. After graduating 
        Physics (2019) and Electrical Engineering (2020), I followed my
        programming passion and started Master's of Science in Data Science at Drexel University. 
      </p>
      <p>
        At Drexel I expended my skill set and learned data analysis,
        machine learning, database management systems and big data. Most of the program
        was taught in Python, but also studied Java, C, SQL and Bash. In May, 2022, I was
        inducted as a member of Drexel Chapter of Upsilon Pi Epsilon (UPE), the international
        honor society for information and computing disciplines.
      </p>
      <p>
        The skills I have developed were very usefull during my internship at USAA as a Data Analyst
        in the Fraud Management Team. I developed a machine learning classification model using Python,
        SQL and HiveQL (Hadoop). I was also working on my presentation skills by attending the weekly
        session of Toast Masters.
      </p>
      <p>
        In my free time, I like to workout (running, biking, swimming), play sports such as soccer and tennis,
        and expand my knowledge in quantum computing, as well as programming.
      </p>
    </section>
  )
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  )
}
