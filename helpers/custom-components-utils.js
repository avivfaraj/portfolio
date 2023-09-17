import HoverLink from "/components/hover-link/hover-link";
import Image from "next/image";
import Gist from "react-gist";
import Styles from "/components/posts/posts-content/post-content.module.css";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import GIF from "/components/gif/gif";
import { Fragment } from "react";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("shell", bash);

export function getID(header) {
  const idTag = header.match(/\{\#([a-zA-z0-9\-]+)\}/g);
  if (idTag) {
    const headerText = header.replace(idTag, "");
    const id = idTag[0].match(/{\#(.*?)}/)?.pop();
    return { idTag: id, header: headerText };
  }
  return;
}

const customComponents = {
  h2(props) {
    try {
      const { idTag, header } = getID(props.children[0]);
      return <h2 id={idTag}>{header}</h2>;
    } catch {
      return <h2>{props.children[0]}</h2>;
    }
  },
  h4(props) {
    try {
      const { idTag, header } = getID(props.children[0]);
      return <h4 id={idTag}>{header}</h4>;
    } catch {
      return <h4>{props.children[0]}</h4>;
    }
  },

  p(paragraph) {
    /* Block for dealing with Gists
         For some reason Gist package is not working well.
      */
    const { node } = paragraph;
    if (node.children[0].tagName === "a") {
      const link = node.children[0];

      const text = link.children[0].value;

      if (text === "Gist") {
        const id = '"' + link.properties.href + '"';
        return (
          <p>
            <Gist id={id} />
          </p>
        );
      }
      if (text.includes("iframe")) {
        const title = text.match(/{title: (.*?)}/)?.pop();
        const ref = link.properties.href;
        return (
          <Fragment>
            <iframe
              src={"/images/" + ref}
              title={title}
              className={Styles.pdf}
            />
          </Fragment>
        );
      }

      if (text.match(/gif/)) {
        const title = text.match(/{title: (.*?)}/)?.pop();
        if (title && link.properties.href) {
          return (
            <GIF id={Styles.test} src={link.properties.href} title={title} />
          );
        }
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
            src={`/images/${image.properties.src}`}
            alt={alt}
            width={width}
            height={height}
            className={Styles.image}
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
    const ref = props.href;
    const text = props.children;

    if (ref[0] === "#") {
      return <HoverLink href={ref} alt={text} target="" />;
    }
    return <HoverLink href={ref} alt={text} />;
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

export default customComponents;
