import { Fragment } from "react";
import Intro from "/components/home-page/intro";
import { getProjects } from "/helpers/posts-utils";
import Head from "next/head";

function Index(props) {
    return (
        <Fragment>
            <Head>
                <title> Aviv Faraj | Data Scientist</title>
                <meta
                    name="description"
                    content="Sharing personal projects in programming, data science and electrical engineering"
                />
            </Head>

            <Intro projects={props.projects} />
        </Fragment>
    );
}

export function getStaticProps() {
    const featuredPosts = getProjects(true);
    const randomizePosts = [...featuredPosts].sort(() => 0.5 - Math.random());
    return {
        props: {
            projects: randomizePosts,
        },
    };
}

export default Index;
