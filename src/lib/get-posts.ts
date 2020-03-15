import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import siteConfig from "../../site.config";

const POSTS_DIRECTORY_NAME = siteConfig.postsDirectory;
const POSTS_DIRECTORY = path.join(
  process.cwd(),
  `/src/pages/${POSTS_DIRECTORY_NAME}`
);

function isFile(path: string): boolean {
  return path.includes(".");
}

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

  return [
    ...files.filter(file => isFile(file)),
    ...files
      .filter(file => !isFile(file))
      .map(file => getPostPaths(file))
      .flat()
  ];
}

// load file contents and front matter
function getPostData(posts: string[]) {
  return posts.map(postPath => {
    const filename = path.parse(postPath);
    const file: string = fs.readFileSync(
      `${POSTS_DIRECTORY}/${postPath}`,
      "utf-8"
    );
    const { content, data } = matter(file);
    return {
      ...data,
      body: content,
      path:
        `/${POSTS_DIRECTORY_NAME}` +
        path.join(filename.dir, filename.name).replace("/index", "")
    };
  });
}

export function getPosts() {
  const TAG = "[ posts ]";
  console.log(`${TAG} scanning for posts`, `pages/${POSTS_DIRECTORY_NAME}/**`);
  const postPaths = getPostPaths();
  postPaths.forEach(path => console.log(`${TAG} -`, path));
  return getPostData(postPaths).sort(
    (a, b) =>
      // TODO type front matter import
      // @ts-ignore
      new Date(b.date).getMilliseconds() - new Date(a.date).getMilliseconds()
  );
}
