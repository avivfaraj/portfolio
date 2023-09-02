import React from "react";
import Image from "next/image";
import Link from "next/link";

function LinkedImage(props) {
    const { src, height, width, alt } = props;
    return (
        <Link href={src}>
            {/* Note: NextJS has deprecated <a> within Link, but
                      target="_blank" didn't work, so I had to add <a> */}
            <a target="_blank">
                <Image
                    priority
                    src={src}
                    layout={"fixed"}
                    height={height}
                    width={width}
                    alt={alt}
                />
            </a>
        </Link>
    );
}

export default LinkedImage;
