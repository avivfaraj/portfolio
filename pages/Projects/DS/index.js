import { Fragment } from "react";
import { getAllPosts } from "/helpers/posts-utils";
import PostGrid from "/components/posts/posts-grid/grid";

function DataSciencePage(props) {
  return (
    <Fragment>
      <h1>Data Science Projects</h1>
      <PostGrid projects={props.projects} />
    </Fragment>
  );
}

export function getStaticProps() {
  const dsProjects = getAllPosts("ds");
  return {
    props: {
      projects: dsProjects,
    },
  };
}

export default DataSciencePage;
