import Link from "next/link";
import Styles from "./sidebar.module.css";
import React, { useState } from "react";
import ButtonList from "/components/button/buttonList";
import Button from "/components/button/button";
import ModalImage from "/components/modal-image/modal-image";

const name = "Aviv Faraj";
const Cards = [
    {
        id: 3.1,
        name: "Data Science",
        reference: "/Projects/DS/",
    },
    {
        id: 3.2,
        name: "Computer Science",
        reference: "/Projects/CS/",
    },
    {
        id: 3.3,
        name: "Engineering",
        reference: "/Projects/EE/",
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
                <img
                    src={"/images/profile.png"}
                    className={Styles.borderCircle}
                />
            </div>
            <h1 className={Styles.heading2Xl}>{name}</h1>

            <Button id={1} name={"Home"} reference={"/"} />

            <Button id={2} name={"About"} reference={"/about"} />

            <Link key={3} href="">
                <a onClick={toggleAll}> Projects </a>
            </Link>
            {showAll && <ButtonList buttons={Cards} />}

            <Button id={4} name={"Publication"} reference={"/publication"} />

            <Button
                id={5}
                name={"Honors & Awards"}
                reference={"/honors-and-awards"}
            />

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
