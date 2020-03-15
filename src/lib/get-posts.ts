import fs from "fs";
import path from "path";
import matter from "gray-matter";
import siteConfig from "../../site.config";

const POSTS_DIRECTORY_NAME = siteConfig.postsDirectory;
const POSTS_DIRECTORY = path.join(
  process.cwd(),
  `/src/pages/${POSTS_DIRECTORY_NAME}`
);

// recursively load posts in directory
function getPostPaths(dir: string = "/") {
  const files = fs
    .readdirSync(`${POSTS_DIRECTORY}${dir}`)
    .map(file => `${dir}${dir !== "/" ? "/" : ""}${file}`)
    .filter(
      file =>
        !file.endsWith(".tsx") &&
        !file.endsWith(".ts") &&
        !file.endsWith(".js") &&
        !file.endsWith(".jsx")
    );

  // filter file extensions so we have directories to descend into
  let directories = files.filter(file => !file.includes("."));

  // posts are the files with dots, and direcotories searched
  let posts = [
    ...files.filter(file => file.includes(".")),
    ...directories.map(file => getPostPaths(file)).flat()
  ];

  return posts;
}

// load file contents and front matter
function getPostData(posts: string[]) {
  return posts.map(postPath => {
    const filename = path.parse(postPath);
    const file = fs.readFileSync(`${POSTS_DIRECTORY}/${postPath}`);
    const { content, data } = matter(file);
    return {
      body: content,
      meta: data,
      path:
        `/${POSTS_DIRECTORY_NAME}` +
        path.join(filename.dir, filename.name).replace("/index", "")
    };
  });
}

export function getPosts() {
  console.log("Scanning for posts", `pages/${POSTS_DIRECTORY_NAME}/**`);
  const postPaths = getPostPaths();
  postPaths.forEach(path => console.log(path));
  return getPostData(postPaths);
}
