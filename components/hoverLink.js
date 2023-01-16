/******* Cite *****
 * Code was taken from https://stackoverflow.com/questions/68025173/how-to-change-image-on-hover-with-nextjs-and-tailwindcss
 * Author: https://stackoverflow.com/users/15304814/sean-w (Sean W.)
 * Some modifications were made.
*/

import Link from 'next/link';
import React, { useState } from "react";
import Styles from '/styles/social.module.css';

export default function HoverLink({href, alt, target = "_blank"}){

	const [isHoveringLink, setIsHoveredLink] = useState(false);
  	const onMouseEnterLink = () => setIsHoveredLink(true);
  	const onMouseLeaveLink = () => setIsHoveredLink(false);
  	return(
        <>
      <Link  href={href} ><a className={Styles.link} target={target} onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink}>{alt}</a></Link>
      </>
	)
}
