import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import Styles from "./post-content.module.css";
import customComponents from "/helpers/custom-components-utils";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("shell", bash);

// export function getID(header) {
//   const idTag = header.match(/\{\#([a-zA-z0-9\-]+)\}/g);
//   if (idTag) {
//     const headerText = header.replace(idTag, "");
//     const id = idTag[0].match(/{\#(.*?)}/)?.pop();
//     return { idTag: id, header: headerText };
//   }
//   return;
// }

function PostContent(props) {
  const { project } = props;

  return (
    <article className={Styles.content}>
      <header className={Styles.header}>
        <title>{project.title}</title>
        <ReactMarkdown
          children={project.content}
          components={customComponents}
        />
        <div className={Styles.gap} />
      </header>
    </article>
  );
}

export default PostContent;
