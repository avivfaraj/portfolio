/******* Cite *****
 * Code was taken from https://stackoverflow.com/questions/68025173/how-to-change-image-on-hover-with-nextjs-and-tailwindcss
 * Author: https://stackoverflow.com/users/15304814/sean-w (Sean W.)
 * Some modifications were made.
*/
import Link from 'next/link';
import React, { useState } from "react";
import styles from '../styles/social.module.css';
import Image from 'next/image';

export default function Social({src,
								href,
								alt,
								long_height = 32,
								short_height = 25,
								long_width = 32,
								short_width = 25}){

	const [isHoveringLink, setIsHoveredLink] = useState(false);
  	const onMouseEnterLink = () => setIsHoveredLink(true);
  	const onMouseLeaveLink = () => setIsHoveredLink(false);
  	return(
   
	    <div onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink}>
	          <a className={styles.social} href={href} target="_blank">
	            {isHoveringLink ? (
	              <Image className = {styles.borderCircle} src={src} width={long_width} height={long_height} alt={alt} />
	            ) : (
	              <Image className = {styles.borderCircle} src={src} width={short_width} height={short_height} alt={alt} />
	            )}
	          </a>
	    </div>
	)
}