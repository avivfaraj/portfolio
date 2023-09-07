import { Fragment } from "react";
import { getPostData, getPostsFiles } from "../../../helpers/posts-utils";

// import { useRouter } from "next/router";
// function PostDetailPage() {
//   const router = useRouter();
//   return <p>Post: {router.query.slug}</p>;
// }

function CSPage(props) {
  const { post } = props;
  return (
    <Fragment>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div>{post.content}</div>
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
    revalidate: 600,
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
