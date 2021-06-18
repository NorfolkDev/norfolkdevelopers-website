import fs from "fs";
import path from "path";
import parseFrontMatter from "./parseFrontMatter";
import { slugify } from "./slugify";

type Cache = {
  posts: any[];
  authors: Tags[];
  tags: Tags[];
};

let cache: Cache = { posts: [], authors: [], tags: [] };

function isFile(path: string): boolean {
  return path.includes(".");
}

export function findValidDirectory(directoryPaths: string[]) {
  return directoryPaths.find(isDirectoryValid);
}

function isDirectoryValid(directoryPath: string): boolean {
  return fs.existsSync(directoryPath);
}

function createDirectoryPath(directoryPath: string) {
  return path.join(process.cwd(), directoryPath);
}

// File types to load
const FILE_TYPE_REGEX = /\.(tsx|ts|js|jsx|DS_Store|jpeg|jpg|png)$/;
const DEFAULT_POST_PATHS = [
  "/src/pages/posts",
  "/pages/posts",
  "/src/pages/words",
  "/pages/words",
  "/src/pages/blog",
  "/pages/blog",
  "/src/pages/writing",
  "/pages/writing",
  "/src/pages/thoughts",
  "/pages/thoughts",
  "/packages/blog/__tests__/test-posts",
];

function findDefaultPostsDirectory() {
  return findValidDirectory(
    DEFAULT_POST_PATHS.map((path) => createDirectoryPath(path))
  );
}

// recursively load posts in directory
type PostPathOptions = {
  directory: string;
};

function getPostPaths(dir: string = "/", options?: PostPathOptions): string[] {
  // @ts-ignore
  const { directory = findDefaultPostsDirectory() } = options;
  const files = fs
    .readdirSync(`${directory}${dir}`)
    .map((file) => `${dir}${dir !== "/" ? "/" : ""}${file}`)
    .filter((file) => !file.match(FILE_TYPE_REGEX));

  return [
    ...files.filter((file) => isFile(file)),
    ...files
      .filter((file) => !isFile(file))
      .map((file) => getPostPaths(file, options))
      // @ts-ignore
      .flat(),
  ];
}

interface PostDataInterface {
  title?: string;
  body: string;
  path: string;
  date: string;
  tags?: string[];
  author?: string[];
  excerpt?: string;
  draft?: boolean;
}

type Options = {
  directory?: string;
  cache?: boolean;
  limit?: number;
  verbose?: boolean;
};

// load file contents and front matter
function getPostData<T extends PostDataInterface>(
  posts: string[],
  options?: Options
): T[] {
  const { directory } = options || {
    directory: findDefaultPostsDirectory(),
  };

  return posts.map((postPath) => {
    const filename = path.parse(postPath);
    const file: string = fs.readFileSync(`${directory}/${postPath}`, "utf-8");
    const { content, data } = parseFrontMatter(file);
    const parseDir = path.parse(directory);
    return {
      date: "",
      ...data,
      body: content,
      path: `/${parseDir.name}${path
        .join(filename.dir, filename.name)
        .replace("/index", "")}`,
    };
  });
}

export function getPosts<T extends PostDataInterface>(
  options: Options = {}
): T[] {
  const {
    directory = findDefaultPostsDirectory(),
    cache: useCache = false,
    limit = undefined,
    verbose = false,
  } = options;

  const TAG = "[ posts ]";

  if (useCache && cache.posts.length > 0) {
    verbose ? console.log(`${TAG} Using cached posts...`) : null;
    return cache.posts;
  }
  cache.posts = [];

  verbose ? console.log(`${TAG} scanning for posts`, `${directory}/**`) : null;

  const postPaths = getPostPaths("/", { directory });
  verbose ? postPaths.forEach((path) => console.log(`${TAG} -`, path)) : null;

  const posts = getPostData<T>(postPaths, { directory })
    .sort(
      (a: T, b: T) =>
        new Date(b.date || "").getTime() - new Date(a.date).getTime()
    )
    .filter((post: T) => !post.draft)
    .slice(0, limit);

  cache.posts = posts;

  return posts;
}

type Tags = {
  [key: string]: PostDataInterface[];
};

export function getTags(): Tags {
  return getPosts({ cache: false }).reduce((acc, current) => {
    if (!current.tags) {
      return acc;
    }

    current.tags.forEach((tag) => {
      const tagSlug = slugify(tag);
      if (!acc.hasOwnProperty(tagSlug)) {
        // @ts-ignore
        acc[tagSlug] = [];
      }

      // @ts-ignore
      acc[tagSlug].push(current);
    });

    return acc;
  }, {});
}

export function getTagPostsBySlug(slug: string) {
  return getTags()[slug];
}

type GetStaticTagPaths = {
  params: {
    tagSlug: string;
  };
};

export function getStaticTagPaths(): GetStaticTagPaths[] {
  return Object.keys(getTags()).map((tag) => {
    return { params: { tagSlug: tag } };
  });
}

export function getAuthors(): Tags {
  return getPosts({ cache: false }).reduce((acc, current) => {
    if (!current.author) {
      return acc;
    }

    current.author.forEach((author) => {
      const authorSlug = slugify(author);
      if (!acc.hasOwnProperty(author)) {
        // @ts-ignore
        acc[authorSlug] = [];
      }

      // @ts-ignore
      acc[authorSlug].push(current);
    });

    return acc;
  }, {});
}

export function getAuthorPostsBySlug(slug: string) {
  return getAuthors()[slug];
}

type GetStaticAuthorPaths = {
  params: {
    authorSlug: string;
  };
};

export function getStaticAuthorPaths(): GetStaticAuthorPaths[] {
  return Object.keys(getAuthors()).map((author) => {
    return { params: { authorSlug: author } };
  });
}
