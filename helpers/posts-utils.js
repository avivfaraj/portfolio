import path from "path";
import matter from "gray-matter";
import fs from "fs";

export function getPostsFiles(subDir) {
  if (subDir === "cs" || subDir === "ds" || subDir === "ee") {
    const postsDirectory = path.join(process.cwd(), "posts");
    const subDirectory = path.join(postsDirectory, subDir);
    try {
      return fs.readdirSync(subDirectory);
    } catch (error) {
      return;
    }
  }
  return;
}

export function getPostData(postIdentifier, subDir) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const postsDirectory = path.join(process.cwd(), "posts");
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
    field: subDir.toUpperCase(),
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

export function getProjects(featured = false) {
  // const postFiles = getPostsFiles(subDir);
  let data = [];
  ["cs", "ds"].map((subDir) => {
    const postFiles = getPostsFiles(subDir);

    if (postFiles) {
      const postsArray = postFiles.map((postFile) => {
        const postData = getPostData(postFile, subDir);
        if (postData) {
          return postData;
        }
      });

      for (const post of postsArray) {
        if ((featured && post.isFeatured) || !featured) {
          data.push(post);
        }
      }
    }
  });

  return data;
}
