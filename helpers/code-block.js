import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { Fragment, useState, useEffect } from "react";
import Styles from "/components/posts/posts-content/post-content.module.css";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("shell", bash);

function CodeBlock({ match, inline, children, filename, props }) {
  const [lineNumbersOn, setLineNumbers] = useState(false);
  const [isUnique, setIsUnique] = useState(false);
  useEffect(() => {
    if (match && match[1] && match[1] == "list") {
      setIsUnique(true);
    }
    if (match && match[1] && match[1] == "output") {
      setIsUnique(true);
    }
  }, []);
  if (inline) {
    return <code {...props}>{children}</code>;
  }
  return (
    <Fragment>
      <div className={Styles.codeblock}>
        {!isUnique ? (
          <div className={Styles.copy}>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigator.clipboard.writeText(children)}
            >
              Copy
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ marginLeft: "6px" }}
              onClick={() => setLineNumbers((val) => !val)}
            >
              Show Line Numbers
            </button>
          </div>
        ) : null}
        {filename && <span className={Styles.filename} >Filename: {filename}</span>}
        {!inline && match && !isUnique ? (

          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, "")}
            style={atomDark}
            language={match[1]}
            className={Styles.code}
            showLineNumbers={lineNumbersOn}
          />
        ) : (
          <code {...props} className={Styles.plaincode}>
            {children}
          </code>
        )}
      </div>
    </Fragment>
  );
}

export default CodeBlock;
