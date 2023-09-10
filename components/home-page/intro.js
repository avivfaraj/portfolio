import Styles from "./intro.module.css";
import GithubCorner from "react-github-corner";
import PostGrid from "../posts/posts-grid/grid";

function Intro(props) {
  return (
    <div className={Styles.test}>
      <div className={Styles.big_gap} />

      <GithubCorner
        href="https://github.com/avivfaraj/portfolio"
        target="_blank"
      />
      <div className={Styles.container}>
        <h2> Welcome </h2>
        <p>
          I am a Data Science Graduate Student at Drexel University. I have a
          dual Bachelor degree in Physics & Electrical Engineering, and in this
          portfolio I aim to showcase a wide variety of projects in Data
          Science, Computer Science, Physics and Engineering.
        </p>
      </div>
      <div className={Styles.single_gap} />
      <div className={Styles.latest}>
        <h2>Featured Posts</h2>
        <PostGrid projects={props.projects} />
      </div>

      <div className={Styles.single_gap} />
    </div>
  );
}

export default Intro;