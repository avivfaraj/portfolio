import { Fragment } from "react";
import { getAllPosts } from "/helpers/posts-utils";
import PostGrid from "/components/posts/posts-grid/grid";

function ComputerSciencePage(props) {
  return (
    <Fragment>
      <h1>Computer Science Projects</h1>
      <PostGrid projects={props.projects} />
      <footer>
        <i>
          Credits: Images were generated by both Adobe Firefly text to image
          generative AI and Microsoft Bing Image Creator
        </i>
      </footer>
      <div style={{ height: "100px" }} />
    </Fragment>
  );
}

export function getStaticProps() {
  const csProjects = getAllPosts("cs");
  const randomizeProjects = [...csProjects].sort(() => 0.5 - Math.random());
  return {
    props: {
      projects: randomizeProjects,
    },
  };
}

export default ComputerSciencePage;
