import PostCard from "./post-card";
import Styles from "./grid.module.css";
import { Fragment } from "react";

function PostGrid(props) {
  const { projects } = props;
  return (
    <Fragment>
      <ul className={Styles.grid}>
        {projects.map((project) => (
          <PostCard key={project.slug} project={project} />
        ))}
      </ul>
      <div className={Styles.gap}></div>
    </Fragment>
  );
}

export default PostGrid;
