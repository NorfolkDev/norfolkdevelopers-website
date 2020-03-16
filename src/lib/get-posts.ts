import fs from "fs";
import path from "path";
import parseFrontMatter from "./parseFrontMatter";
import siteConfig from "../../site.config";

const POSTS_DIRECTORY_NAME = siteConfig.postsDirectory;
const POSTS_DIRECTORY = path.join(
  process.cwd(),
  `/src/pages/${POSTS_DIRECTORY_NAME}`
);

let cache = { posts: [] };

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
        !file.endsWith(".jsx") &&
        !file.endsWith(".DS_Store")
    );

  return [
    ...files.filter(file => isFile(file)),
    ...files
      .filter(file => !isFile(file))
      .map(file => getPostPaths(file))
      .flat()
  ];
}

type FrontMatter = {
  body: string;
  path: string;
  tags?: string[];
  author?: string[];
};

// load file contents and front matter
function getPostData(posts: string[]): FrontMatter[] {
  return posts.map(postPath => {
    const filename = path.parse(postPath);
    const file: string = fs.readFileSync(
      `${POSTS_DIRECTORY}/${postPath}`,
      "utf-8"
    );
    const { content, data } = parseFrontMatter(file);

    return {
      ...data,
      body: content,
      path:
        `/${POSTS_DIRECTORY_NAME}` +
        path.join(filename.dir, filename.name).replace("/index", "")
    };
  });
}

export function getPosts(useCache?: boolean) {
  const TAG = "[ posts ]";
  if (useCache && cache.posts !== []) {
    console.log(`${TAG} Using cached posts...`);
    return cache.posts;
  }
  cache.posts = [];
  console.log(`${TAG} scanning for posts`, `pages/${POSTS_DIRECTORY_NAME}/**`);
  const postPaths = getPostPaths();
  postPaths.forEach(path => console.log(`${TAG} -`, path));
  const posts = getPostData(postPaths).sort(
    (a, b) =>
      // TODO type front matter import
      // @ts-ignore
      new Date(b.date).getMilliseconds() - new Date(a.date).getMilliseconds()
  );
  cache.posts = posts;
  return posts;
}

export function getTags() {
  return getPosts(true).reduce((acc, current, index) => {
    console.log("index", index, acc);
    if (!current.tags) {
      return acc;
    }
    current.tags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(current);
    });
    return acc;
  });
}

export function getPostsForTag(tag: string) {
  return getTags()[tag];
}
