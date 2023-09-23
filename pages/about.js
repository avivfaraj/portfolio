/*Thanks for Borges53 for the Timeline code:
https://github.com/Borges53/Timeline/blob/main/components/Timeline/index.js
*/

import Items from "/vars/about_timeline";
import Item from "/components/timeline/timeline-item";
import Styles from "/components/timeline/timeline.module.css";

function About() {
    return (
        <div className={Styles["main"]}>
            <h2>About</h2>
            <div className={Styles["container-timeline"]}>
                {Items.map((item) => (
                    <Item props={item} key={item.title} />
                ))}
            </div>
            <div className={Styles.gap} />
        </div>
    );
}

export default About;
