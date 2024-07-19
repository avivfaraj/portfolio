import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

function LinkedImage(props) {
    const { src, height, width, alt } = props;

    console.log(src);
    return (
        <Link href={src} target="_blank">
            <Image
                src={src}
                // layout={"fixed"}
                height={height}
                width={width}
                alt={alt}
                loading="lazy"
            />
        </Link>
    );
}

export default LinkedImage;
