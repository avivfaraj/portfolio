import React from "react";
import Styles from "./post-card.module.css";
import Link from "next/link";
import Image from "next/legacy/image";

function PostCard(props) {
  const { title, field, desc, date, image, keywords, slug } = props.project;

  // Removed date from cards.
  // TODO: Add date back and format css files.
  // const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });

  const imagePath = `/images/${slug}/${image}`;

  const linkPath = `/Projects/${field}/${slug}`;

  return (
    <li>
      <Link key={slug} href={linkPath} className={Styles.link}>
        <div className={Styles.card}>
          <div className={Styles.image}>
            <Image
              src={imagePath}
              alt={title}
              width={100}
              height={65}
              layout="responsive"
            />
          </div>
          <div className={Styles.content}>
            <h3>{title}</h3>
            {/* <time>{formattedDate}</time> */}
            <p>{desc}</p>
          </div>
          <footer className={Styles.span}>
            <b>Keywords: </b> {keywords}
          </footer>
        </div>
      </Link>
    </li>
  );
}

export default PostCard;
