import { Fragment } from "react";
import { getAllPosts } from "/helpers/posts-utils";
import PostGrid from "/components/posts/posts-grid/grid";

function DataSciencePage(props) {
  return (
    <Fragment>
      <h1>Engineering Projects</h1>
      <PostGrid projects={props.projects} />
    </Fragment>
  );
}

export function getStaticProps() {
  const eeProjects = getAllPosts("ee");
  return {
    props: {
      projects: eeProjects,
    },
  };
}

export default DataSciencePage;
