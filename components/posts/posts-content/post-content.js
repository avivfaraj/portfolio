import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import Styles from "./post-content.module.css";
import HoverLink from "/components/hover-link/hover-link";
import Image from "next/image";
import Gist from "react-gist";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("shell", bash);

function PostContent(props) {
  const { project } = props;

  const customComponents = {
    p(paragraph) {
      /* Block for dealing with Gists
         For some reason Gist package is not working well.
      */
      const { node } = paragraph;
      if (node.children[0].tagName === "a") {
        const link = node.children[0];
        console.log(link);
        const text = link.children[0].value;
        console.log(text);
        if (text === "Gist") {
          const id = '"' + link.properties.href + '"';
          return (
            <p>
              <Gist id={id} />
            </p>
          );
        }
      }

      /* Thanks to Amir Ardalan for the paragraph code below.
      (https://amirardalan.com/blog/use-next-image-with-react-markdown#add-custom-metastring-logic)
      */
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const metastring = image.properties.alt;
        const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
        const metaWidth = metastring.match(/{([^}]+)x/);
        const metaHeight = metastring.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : "600";
        const height = metaHeight ? metaHeight[1] : "300";
        const hasCaption = metastring?.toLowerCase().includes("{caption:");
        const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

        return (
          <figure className={Styles.fig}>
            <Image
              src={`/images/${project.slug}/${image.properties.src}`}
              alt={alt}
              width={width}
              height={height}
            />
            {hasCaption && (
              <>
                <figcaption className={Styles.figcap}>{caption}</figcaption>
              </>
            )}
          </figure>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    a(props) {
      return <HoverLink href={props.href} alt={props.children} />;
    },

    /* Thanks to @conorhastings (https://github.com/conorhastings)
       for the customComponent code below.
    */
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return (
        <div className={Styles.codeblock}>
          <button
            className={Styles.copy}
            onClick={() => navigator.clipboard.writeText(children)}
          >
            test
          </button>
          {!inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={atomDark}
              language={match[1]}
              className={Styles.code}
            />
          ) : (
            <code {...props} className={Styles.code}>
              {children}
            </code>
          )}
        </div>
      );
    },
  };

  return (
    <article className={Styles.content}>
      <header className={Styles.header}>
        <title>{project.title}</title>
        <date>{project.date}</date>
        <ReactMarkdown
          children={project.content}
          components={customComponents}
        />
      </header>
    </article>
  );
}

export default PostContent;
