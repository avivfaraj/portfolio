import ReactMarkdown from "react-markdown";
import Styles from "./post-content.module.css";
import customComponents from "/helpers/custom-components-utils";
import Link from "next/link";

function PostContent(props) {
    const { project } = props;
    const keywordsArray = project.keywords.replace(".", "").split(",");
    return (
        <article className={Styles.container}>
            <header>
                <title>{project.title}</title>
            </header>
            <div className={Styles.content}>
                <div className={Styles.keywords}>
                    <b>Keywords: </b>{" "}
                    {keywordsArray.map((keyword, index) => (
                        <Link
                            key={keyword.trim()}
                            href={`/Projects/${keyword.trim()}`}
                        >
                            {keyword.trim()}
                            {index != keywordsArray.length - 1 ? "," : ""}
                        </Link>
                    ))}
                </div>
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
