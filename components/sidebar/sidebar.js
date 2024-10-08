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
    target: "",
  },
  {
    id: 2,
    name: "About",
    reference: "/about",
    target: "",
  },
  {
    id: 3,
    name: "Data Science",
    reference: "/Projects/DS/",
    target: "",
  },
  {
    id: 4,
    name: "Computer Science",
    reference: "/Projects/CS/",
    target: "",
  },
  {
    id: 5,
    name: "Engineering",
    reference: "/Projects/EE/",
    target: "",
  },
  {
    id: 6,
    name: "Awards",
    reference: "/honors-and-awards",
    target: "",
  },
  {
    id: 7,
    name: "Publication",
    reference: "http://rdcu.be/b5Vhh",
    target: "_blank",
  },
  {
    id: 8,
    name: "Contact",
    reference: "/contact",
    target: "",
  },
];

export default function Sidebar() {
  return (
    <nav className={Styles.nav}>
      <div className={Styles.profile}>
        <img src={"/images/profile.png"} className={Styles.borderCircle} />
      </div>
      <div className={Styles.heading2Xl}>
        <h2>{name}</h2>
      </div>
      <div className={Styles.buttons}>
        <ButtonList buttons={Cards} />
      </div>

      <div className={Styles.banner}>
        <ModalImage
          src="/images/github_32px.png"
          alt="github"
          href="https://github.com/avivfaraj"
        />
        <ModalImage
          src="/images/gitlab-logo-500.png"
          alt="gitlab"
          href="https://gitlab.com/avivfaraj"
          short_height="32"
          short_width="36"
          long_height="36"
          long_width="40"
        />
        <ModalImage
          src="/images/linkedin_26px.png"
          alt="linkedin"
          href="https://www.linkedin.com/in/aviv-faraj-857278180/"
        />
      </div>
    </nav>
  );
}
