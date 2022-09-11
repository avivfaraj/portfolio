import Link from 'next/link'
import React from "react";
import Image from 'next/image';

export default function LinkedImage({src, height, width, alt}){
  return(
   
    <a href={src} target="_blank">
      <Image
              priority
              src={src}
              layout={'fixed'}
              height={height}
              width={width}
              alt={alt}
        />
      </a>
   
    );
}