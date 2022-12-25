import Link from 'next/link'
import Styles from '../styles/sidebar.module.css'
import React, { useState } from "react";
import ButtonList from './buttonList'
import Image from 'next/image';
import Head from 'next/head';
import Button from './button';
import EnlargeImage from './enlargeImage';

const name = 'Aviv Faraj';
const Cards = [
{
  id: 3.1,
  name: "Data Science",
  reference: "/Projects/DS/ds_home"
},
{
  id: 3.2,
  name: "Computer Science",
  reference: "/Projects/CS/cs_home"
},
{
  id: 3.3,
  name: "Engineering",
  reference: "/Projects/EE/ee_home"
}
];

export default function Sidebar() {
  const [showAll, setShowAll] = useState(false);
  const toggleAll = () => {
    setShowAll(val => !val)
    };

  return (
    <nav className={Styles.nav}>
    <div className={Styles.profile}>
      <Image
              priority
              src="/images/profile.png"
              className={Styles.borderCircle}
              layout={'fixed'}
              height={138}
              width={144}
              alt={name}
        />

      </div>
      <h1 className={Styles.heading2Xl}>{name}</h1>

      <Button id={1} name={"Home"} reference={"/"} />

      <Button id={2} name={"About"} reference={"/about"} />

      <Link key={3} href="">
          <a onClick={toggleAll}> Projects </a>
      </Link>
      {showAll &&
      <ButtonList buttons={Cards}/>}

      <Button id={4} name={"Honors & Awards"} reference={"/honors-and-awards"} />

      <div className={Styles.banner}>
        <EnlargeImage src="/images/github_32px.png"
                alt="github"
                href="https://github.com/avivfaraj" />

        <EnlargeImage src="/images/linkedin_26px.png"
                alt="linkedin"
                href="https://www.linkedin.com/in/aviv-faraj-857278180/" />

        <EnlargeImage src="/images/gmail_logo.png"
                alt="logo"
                href="mailto:avivfaraj4@gmail.com" />
      </div>
    </nav>


  )
}
