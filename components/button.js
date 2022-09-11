import Link from 'next/link'
import React from "react";

export default function Button({id,name, reference}){
  return(
   
    <Link key={id} href={reference}>
      <a> {name}</a>
    </Link>
   
    );
}