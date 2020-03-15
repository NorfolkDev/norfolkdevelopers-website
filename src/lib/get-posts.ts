const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
import siteConfig from "../../site.config";

const POSTS_DIRECTORY = siteConfig.postsDirectory;
const FILE_DIR = path.join(process.cwd(), `/src/pages/${POSTS_DIRECTORY}`);

console.log("Scanning for posts", FILE_DIR);

function getPostsInDirectory(dir: string = "/") {
  // files and directories
  const files = fs
    .readdirSync(`${FILE_DIR}${dir}`)
    .map(file => `${dir}${dir !== "/" ? "/" : ""}${file}`)
    .filter(
      file =>
        !file.endsWith(".tsx") &&
        !file.endsWith(".ts") &&
        !file.endsWith(".js") &&
        !file.endsWith(".jsx")
    );

  // filter file extensions so we have directories to search
  let directories = files.filter(file => !file.includes("."));

  // posts are the files with dots, and direcotories searched
  let posts = [
    ...files.filter(file => file.includes(".")),
    ...directories.map(file => getPostsInDirectory(file)).flat()
  ];

  return posts;
}

// load file contents and front matter
function getFrontMatterForPosts(posts: string[]) {
  return posts.map(postPath => {
    const filename = path.parse(postPath);
    const file = fs.readFileSync(`${FILE_DIR}/${postPath}`);
    const { content, data } = matter(file);
    return {
      body: content,
      meta: data,
      path:
        `/${POSTS_DIRECTORY}` +
        path.join(filename.dir, filename.name).replace("/index", "")
    };
  });
}

const postPaths = getPostsInDirectory();
const files = getFrontMatterForPosts(postPaths);

export { files };
