import HoverLink from "/components/hover-link/hover-link";
import Image from "next/image";
import Styles from "/components/posts/posts-content/post-content.module.css";
import GIF from "/components/gif/gif";
import { Fragment, useState } from "react";
import CodeBlock from "/helpers/code-block";


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
  ol(props) {
    return <ol className={Styles.customol}>{props.children}</ol>;
  },
  li(props) {
    return (
      <li className={Styles.customli}>
        <span className={Styles.licontent}>{props.children}</span>
      </li>
    );
  },
  ul(props) {
    return <ul className={Styles.customol}>{props.children}</ul>;
  },
  h1(props) {
      return (
        <h1 className={Styles.h1}>
          {props.children}
        </h1>
      );
  },
  h2(props) {
    try {
      const { idTag, header } = getID(props.children[0]);
      return (
        <h2 id={idTag} className={Styles.h2}>
          {header}
        </h2>
      );
    } catch {
      return <h2 className={Styles.h2}>{props.children[0]}</h2>;
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

      // if (text === "Gist") {
      //   const id = '"' + link.properties.href + '"';
      //   return (
      //     <p>
      //       <Gist id={id} />
      //     </p>
      //   );
      // }
      if (text.includes("iframe")) {
        const title = text.match(/{title: (.*?)}/)?.pop();
        const ref = link.properties.href;

        if (!ref.includes("https")) {
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

        return (
          <Fragment>
            <iframe src={ref} title={title} className={Styles.pdf} />
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

    /* Spacers - used by inserting '{gap: value}' in markdown */
    if (
      node.children[0].type === "text" &&
      node.children[0].value.includes("{gap:")
    ) {
      const value = node.children[0].value.match(/{gap: (.*?)}/)?.pop();
      if (value) {
        return <div style={{ height: value }}></div>;
      }
    }
    return <p>{paragraph.children}</p>;
  },

  hr(props) {
    return (
      <div className={Styles.hr}>
        <hr></hr>
      </div>
    );
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
    const [lineNumbersOn, setLineNumbers] = useState(false);
    let header = "";
    if(match && "input" in match && match["input"] !== match[0]){
      var words = match["input"].split("-");
      for (var i =2; i < words.length; i++){
        header += " " + words[i];
      }

      return(
        <details>
          <summary>{header}</summary>

          <CodeBlock
              match={match}
              node={node}
              inline={inline}
              className={className}
              children={children}
              props={...props} 
          />
      
        </details>
      );
    }
    return <CodeBlock match={match}
              node={node}
              inline={inline}
              className={className}
              children={children}
              props={...props}  />;
  },
};


export default customComponents;
