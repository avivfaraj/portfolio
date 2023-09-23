import ReactMarkdown from "react-markdown";
import Styles from "./post-content.module.css";
import customComponents from "/helpers/custom-components-utils";

function PostContent(props) {
    const { project } = props;

    return (
        <article className={Styles.container}>
            <header>
                <title>{project.title}</title>
            </header>
            <div className={Styles.content}>
                <ReactMarkdown
                    children={project.content}
                    components={customComponents}
                />
            </div>

            {/* Create gap in the bottom of the page besides pages
          that contain iframes (articles) */}
            {!project.content.includes("iframe") ? (
                <div className={Styles.gap} />
            ) : (
                ""
            )}
        </article>
    );
}

export default PostContent;
