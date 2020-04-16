import fs from "fs";
import path from "path";
import parseFrontMatter from "./parseFrontMatter";
import siteConfig from "../../site.config";
import { slugify } from "./slugify";

const POSTS_DIRECTORY_NAME = siteConfig.postsDirectory;
const POSTS_DIRECTORY = path.join(
  process.cwd(),
  `/src/pages/${POSTS_DIRECTORY_NAME}`
);

type Cache = {
  posts: FrontMatter[];
  authors: any[];
  tags: any[];
};

let cache: Cache = { posts: [], authors: [], tags: [] };

function isFile(path: string): boolean {
  return path.includes(".");
}

// recursively load posts in directory
function getPostPaths(dir: string = "/"): string[] {
  const files = fs
    .readdirSync(`${POSTS_DIRECTORY}${dir}`)
    .map((file) => `${dir}${dir !== "/" ? "/" : ""}${file}`)
    .filter(
      (file) =>
        !file.endsWith(".tsx") &&
        !file.endsWith(".ts") &&
        !file.endsWith(".js") &&
        !file.endsWith(".jsx") &&
        !file.endsWith(".DS_Store") &&
        !file.endsWith(".jpg") &&
        !file.endsWith(".png") &&
        !file.endsWith(".jpeg")
    );

  return [
    ...files.filter((file) => isFile(file)),
    ...files
      .filter((file) => !isFile(file))
      .map((file) => getPostPaths(file))
      // @ts-ignore
      .flat(),
  ];
}

export type FrontMatter = {
  title?: string;
  body: string;
  path: string;
  date: string;
  tags?: string[];
  author?: string[];
  excerpt?: string;
  draft?: boolean;
};

// load file contents and front matter
function getPostData(posts: string[]): FrontMatter[] {
  return posts.map((postPath) => {
    const filename = path.parse(postPath);
    const file: string = fs.readFileSync(
      `${POSTS_DIRECTORY}/${postPath}`,
      "utf-8"
    );
    const { content, data } = parseFrontMatter(file);

    return {
      date: "",
      ...data,
      body: content,
      path:
        `/${POSTS_DIRECTORY_NAME}` +
        path.join(filename.dir, filename.name).replace("/index", ""),
    };
  });
}

export function getPosts(useCache?: boolean) {
  const TAG = "[ posts ]";
  if (useCache && cache.posts.length > 0) {
    console.log(`${TAG} Using cached posts...`);
    return cache.posts;
  }
  cache.posts = [];
  console.log(`${TAG} scanning for posts`, `pages/${POSTS_DIRECTORY_NAME}/**`);
  const postPaths = getPostPaths();
  postPaths.forEach((path) => console.log(`${TAG} -`, path));
  const posts = getPostData(postPaths);
  posts
    .sort(
      (a: FrontMatter, b: FrontMatter) =>
        new Date(b.date || "").getTime() - new Date(a.date).getTime()
    )
    .filter((post) => !post.draft);
  cache.posts = posts;
  return posts;
}

export function getTags() {
  return getPosts(true).reduce((acc, current, index) => {
    if (!current.tags) {
      return acc;
    }
    current.tags.forEach((tag) => {
      return {
        ...acc,
        [tag]: current,
      };
    });
    return acc;
  }, []);
}

export function getAuthors() {
  return getPosts(true).reduce((acc, current, index) => {
    if (!current.author) {
      return acc;
    }
    current.author.forEach((authorName) => {
      const authorSlug = slugify(authorName);
      return {
        ...acc,
        [authorSlug]: current,
      };
    });
    return acc;
  }, []);
}
