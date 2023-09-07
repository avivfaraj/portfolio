import path from "path";
import matter from "gray-matter";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles(subDir) {
  if (subDir === "cs" || subDir === "ds" || subDir === "ee") {
    const subDirectory = path.join(postsDirectory, subDir);
    return fs.readdirSync(subDirectory);
  }

  return;
}

export function getPostData(postIdentifier, subDir) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, subDir, `${postSlug}.md`);
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return;
  }
  if (!fileContent) {
    console.log("no file");
    return;
  }

  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    field: subDir,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts(subDir) {
  const postFiles = getPostsFiles(subDir);
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile, subDir);
  });

  return allPosts;
}

export function getFeaturedPosts(subDir) {
  const allPosts = getAllPosts(subDir);

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
