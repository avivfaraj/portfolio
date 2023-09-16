import { Fragment } from "react";
import { getAllPosts } from "/helpers/posts-utils";
import PostGrid from "/components/posts/posts-grid/grid";

function ComputerSciencePage(props) {
  return (
    <Fragment>
      <h1>Computer Science Projects</h1>
      <PostGrid projects={props.projects} />
    </Fragment>
  );
}

export function getStaticProps() {
  const csProjects = getAllPosts("cs");
  return {
    props: {
      projects: csProjects,
    },
  };
}

export default ComputerSciencePage;
