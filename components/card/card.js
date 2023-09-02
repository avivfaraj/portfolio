import React from "react";
import Styles from "./card.module.css";
import Link from "next/link";

function Card(props) {
    const { name, href, desc, keywords } = props;
    return (
        <div className={Styles.card}>
            <Link href={href}>
                <div>
                    <h3>{name}</h3>
                    <p>{desc}</p>
                    &nbsp;
                    <p>
                        <b>Keywords: </b> {keywords}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default Card;
