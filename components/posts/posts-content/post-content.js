import ReactMarkdown from "react-markdown";
import Styles from "./post-content.module.css";
import customComponents from "/helpers/custom-components-utils";

function PostContent(props) {
  const { project } = props;

  return (
    <article className={Styles.content}>
      <header className={Styles.header}>
        <title>{project.title}</title>
      </header>
      <div className={Styles.cont}>
        <ReactMarkdown
          children={project.content}
          components={customComponents}
        />
      </div>
      <div className={Styles.gap} />
    </article>
  );
}

export default PostContent;
