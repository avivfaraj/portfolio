import Styles from "/styles/grid.module.css";
import Card from "/components/card/card";
import Projects from "/vars/home_proj";
import GithubCorner from "react-github-corner";

function Index() {
    return (
        <section>
            <div className={Styles.gap} />
            <div className={Styles.gap} />

            <GithubCorner href="https://github.com/avivfaraj/portfolio" />
            <div className={Styles.container}>
                <h2> Welcome </h2>
            </div>
            <p>
                {" "}
                I am a Data Science Graduate Student at Drexel University. I
                have a dual Bachelor degree in Physics & Electrical Engineering,
                and in this portfolio I aim to showcase a wide variety of
                projects in Data Science, Computer Science, Physics and
                Engineering.
            </p>
            <div className={Styles.container}>
                <h2> Sample Projects</h2>
                <div className={Styles.grid}>
                    {Projects.map((proj, index) => (
                        <Card key={index} {...proj} />
                    ))}
                </div>
            </div>
            <div className={Styles.gap} />
        </section>
    );
}

export default Index;
