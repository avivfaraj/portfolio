import { Fragment } from "react";
import { getPostData, getPostsFiles } from "/helpers/posts-utils";
import PostContent from "/components/posts/posts-content/post-content";
import GithubCorner from "/components/github-corner/github-corner";
import GitlabCorner from "/components/gitlab-corner/gitlab-corner";

function EEPage(props) {
  const { post } = props;
  return (
    <Fragment>
      {post.github && <GithubCorner href={post.github} />}
      {post.gitlab && <GitlabCorner href={post.gitlab} />}
      <PostContent project={post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug, "ee");

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
  const postFilenames = getPostsFiles("ee");

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
}

export default EEPage;
