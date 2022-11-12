/******* Cite *****
 * Code was taken from https://stackoverflow.com/questions/68025173/how-to-change-image-on-hover-with-nextjs-and-tailwindcss
 * Author: https://stackoverflow.com/users/15304814/sean-w (Sean W.)
 * Some modifications were made.
*/

import Link from 'next/link';
import React, { useState } from "react";
import styles from '../styles/social.module.css';

export default function HoverLink({href, alt, src = false}){

	const [isHoveringLink, setIsHoveredLink] = useState(false);
  	const onMouseEnterLink = () => setIsHoveredLink(true);
  	const onMouseLeaveLink = () => setIsHoveredLink(false);
  	return(
      <Link onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink} href={href} ><a className={styles.link} target="_blank">{alt}</a></Link>
	)
}
