import PostCard from "./post-card";
import Styles from "./grid.module.css";

function PostGrid(props) {
  const { projects } = props;
  return (
    <ul className={Styles.grid}>
      {projects.map((project) => (
        <PostCard key={project.slug} project={project} />
      ))}
    </ul>
  );
}

export default PostGrid;
