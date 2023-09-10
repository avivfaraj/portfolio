import React, { Fragment } from "react";
import Styles from "./post-card.module.css";
import Link from "next/link";
import Image from "next/legacy/image";

function PostCard(props) {
  const { title, field, desc, date, image, keywords, slug } = props.project;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/${slug}/${image}`;

  const linkPath = `/Projects/${field.toUpperCase()}/${slug}`;

  return (
    <li>
      <Link href={linkPath} className={Styles.link}>
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
            <time>{formattedDate}</time>
            <p>{desc}</p>
            <p>
              <b>Keywords: </b> {keywords}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PostCard;
