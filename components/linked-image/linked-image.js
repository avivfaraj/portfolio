import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

function LinkedImage(props) {
  const { src, height, width, alt } = props;
  return (
    <Link href={src} target="_blank">
      {/* Note: NextJS has deprecated <a> within Link, but
                      target="_blank" didn't work, so I had to add <a> */}
      <Image
        src={src}
        layout={"fixed"}
        height={height}
        width={width}
        alt={alt}
        loading="lazy"
      />
    </Link>
  );
}

export default LinkedImage;
