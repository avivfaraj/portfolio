import Styles from "./sidebar.module.css";
import React, { useState } from "react";
import ButtonList from "/components/button/buttonList";
import ModalImage from "/components/modal-image/modal-image";

const name = "Aviv Faraj";
const Cards = [
  {
    id: 1,
    name: "Home",
    reference: "/",
  },
  {
    id: 2,
    name: "About",
    reference: "/about",
  },
  {
    id: 3,
    name: "Data Science",
    reference: "/Projects/DS/",
  },
  {
    id: 4,
    name: "Computer Science",
    reference: "/Projects/CS/",
  },
  {
    id: 5,
    name: "Engineering",
    reference: "/Projects/EE/",
  },
  {
    id: 6,
    name: "Awards",
    reference: "/honors-and-awards/",
  },
];

export default function Sidebar() {
  const [showAll, setShowAll] = useState(false);
  const toggleAll = () => {
    setShowAll((val) => !val);
  };

  return (
    <nav className={Styles.nav}>
      <div className={Styles.profile}>
        <img src={"/images/profile.png"} className={Styles.borderCircle} />
      </div>
      <h1 className={Styles.heading2Xl}>{name}</h1>

      <ButtonList buttons={Cards} />

      <div className={Styles.banner}>
        <ModalImage
          src="/images/github_32px.png"
          alt="github"
          href="https://github.com/avivfaraj"
        />

        <ModalImage
          src="/images/linkedin_26px.png"
          alt="linkedin"
          href="https://www.linkedin.com/in/aviv-faraj-857278180/"
        />

        <ModalImage
          src="/images/gmail_logo.png"
          alt="logo"
          href="mailto:avivfaraj4@gmail.com"
        />
      </div>
    </nav>
  );
}
