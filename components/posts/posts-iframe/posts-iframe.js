import ReactMarkdown from "react-markdown";
import Styles from "./posts-iframe.module.css";
import customComponents from "/helpers/custom-components-utils";
import { Fragment } from "react";

function PostIframe(props) {
    const { project } = props;

    return (
        <div className={Styles.frame}>
            <ReactMarkdown
                children={project.content}
                components={customComponents}
            />
        </div>
    );
}

export default PostIframe;
