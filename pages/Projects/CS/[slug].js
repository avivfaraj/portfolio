import { Fragment } from "react";
import { getPostData, getPostsFiles } from "/helpers/posts-utils";
import PostContent from "/components/posts/posts-content/post-content";
import GithubCorner from "react-github-corner";
import Head from "next/head";

function CSPage(props) {
  const { post } = props;
  return (
    <Fragment>
      <Head>
        <title> Aviv Faraj | Data Scientist</title>
        <meta name="description" content={post.desc} />
      </Head>
      {post.github && <GithubCorner href={post.github} />}
      <PostContent project={post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug, "cs");

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: postData,
    },
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles("cs");

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
}

export default CSPage;
