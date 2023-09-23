import Styles from "./intro.module.css";
import GithubCorner from "react-github-corner";
import PostGrid from "/components/posts/posts-grid/grid";

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
        <div style={{ height: "50px" }} />
        <p style={{ fontSize: "20px" }}>
          I am a Data Scientist at USAA Federal Savings Bank. I Graduated from
          Drexel University with Master of Science in Data Science with 4.0 GPA.
          I also have a dual Bachelor degree in Physics & Electrical
          Engineering, and in this portfolio I aim to showcase a wide variety of
          projects in Data Science, Computer Science, Physics and Engineering.
        </p>
      </div>
      <div className={Styles.single_gap} />
      <div className={Styles.latest}>
        <h2>Featured Posts</h2>
        <div style={{ height: "50px" }} />

        <PostGrid projects={props.projects} />
      </div>
      <div className={Styles.single_gap} />
      <footer>
        <i>
          Credits: Images were generated by both Adobe Firefly text to image
          generative AI and Microsoft Bing Image Creator
        </i>
      </footer>
      <div className={Styles.single_gap} />
    </div>
  );
}

export default Intro;
