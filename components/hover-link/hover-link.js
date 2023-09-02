/******* Cite *****
 * Code was taken from https://stackoverflow.com/questions/68025173/how-to-change-image-on-hover-with-nextjs-and-tailwindcss
 * Author: https://stackoverflow.com/users/15304814/sean-w (Sean W.)
 * Some modifications were made.
 */

import Link from "next/link";
import React, { Fragment, useState } from "react";
import Styles from "./hover-link.module.css";

function HoverLink(props) {
    const { href, alt, target = "_blank" } = props;
    const [isHoveringLink, setIsHoveredLink] = useState(false);
    const onMouseEnterLink = () => setIsHoveredLink(true);
    const onMouseLeaveLink = () => setIsHoveredLink(false);
    return (
        <Fragment>
            <Link href={href}>
                <a
                    className={Styles.link}
                    target={target}
                    onMouseEnter={onMouseEnterLink}
                    onMouseLeave={onMouseLeaveLink}
                >
                    {alt}
                </a>
            </Link>
        </Fragment>
    );
}

export default HoverLink;
