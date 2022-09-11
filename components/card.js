import Link from 'next/link'
import React from "react";
import styles from '../styles/grid.module.css'

export default function Card({name, href, desc, keywords}){
  return(
    <a href={href} className={styles.card}>
      <h3>{name}</h3>
      <p>{desc}</p>
      &nbsp;
      <p><b>Keywords: </b> {keywords}</p>
    </a>
    );
}