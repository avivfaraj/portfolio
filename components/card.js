import Link from 'next/link'
import React from "react";
import Styles from "/styles/grid.module.css"
export default function Card({name, href, desc, keywords}){
  return(
    <a href={href} className={Styles.card}>
      <h3>{name}</h3>
      <p>{desc}</p>
      &nbsp;
      <p><b>Keywords: </b> {keywords}</p>
    </a>
    );
}
