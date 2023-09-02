/* Thanks to Borges53 for the Timeline code:
https://github.com/Borges53/Timeline/blob/main/components/Timeline/item.js
*/

import React from "react";
import Styles from "./timeline.module.css";

function Item({ props }) {
    const { title, description, start_date } = props;
    return (
        <div className={Styles["container-item"]}>
            <div className={Styles["container-content-item"]}>
                <div className={Styles["container-content-header"]}>
                    <div
                        className={
                            Styles["container-content-header-background"]
                        }
                    >
                        <div className={`${Styles["start-date"]}`}>
                            {start_date}
                        </div>
                    </div>
                    <span
                        className={`${Styles["container-content-header-time"]}`}
                    >
                        {title}
                    </span>

                    <span className={Styles["container-content-desc-item"]}>
                        {description}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Item;
