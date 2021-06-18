import path from "path";
import {
  getPosts,
  getTags,
  getTagPostsBySlug,
  getAuthors,
  getAuthorPostsBySlug,
  findValidDirectory,
  getStaticTagPaths,
  getStaticAuthorPaths,
} from "../src/blog-fns";

const getPostsDefaultOptions = {
  cache: false,
  directory: path.join(process.cwd(), `/packages/blog/__tests__/test-posts`),
};

const getCustomPostsDefaultOptions = {
  cache: false,
  directory: path.join(process.cwd(), `/packages/blog/__tests__/test-custom-posts`),
};

type PostData = {
  title?: string;
  body: string;
  path: string;
  date: string;
  tags?: string[];
  author?: string[];
  excerpt?: string;
  draft?: boolean;
}

type CustomPostData = PostData & {
  custom: string;
}

const getPostByKey = (posts, key, title) => {
  return posts.find(p => p[key] === title);
}

describe("blog-fns", () => {
  it("needs tests", () => {
    expect(2 + 2).toBe(4);
  });

  it("should read a set of posts from the filesystem and return an array", () => {
    const posts = getPosts<PostData>(getPostsDefaultOptions);
    expect(posts).toHaveLength(5);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem and return a limited subset", () => {
    const posts = getPosts<PostData>({ ...getPostsDefaultOptions, limit: 2 });
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem in a default location", () => {
    const posts = getPosts<PostData>({ limit: 2 });
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem in a default location without any additional options", () => {
    const posts = getPosts<PostData>();
    expect(posts).toHaveLength(5);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of custom posts and return the additional fields", () => {
    const posts = getPosts<CustomPostData>(getCustomPostsDefaultOptions);
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("First custom post");
    expect(posts[0].custom).toBe("Custom field");
  });

  it("should read a set of posts from the filesystem and derive a tag object", () => {
    const tags = getTags();
    expect(Object.keys(tags)[0]).toEqual("tag-one");
    expect(Object.keys(tags)[1]).toEqual("tag-two");
    expect(tags[Object.keys(tags)[0]]).toHaveLength(2);
    expect(tags[Object.keys(tags)[2]]).toHaveLength(2);
  });

  it("should return a list of posts for a single tag slug", () => {
    const tagPosts = getTagPostsBySlug("tag-one");
    expect(tagPosts).toHaveLength(2);
    expect(tagPosts[0].title).toEqual("First post");
  });

  it("should return a list of Next.js StaticPath objects for tags", () => {
    const paths = getStaticTagPaths();
    expect(paths).toBeInstanceOf(Array);
    expect(paths).toHaveLength(7);
    expect(paths[0].params.tagSlug).toEqual("tag-one");
    expect(paths[1].params.tagSlug).toEqual("tag-two");
  });

  it("should read a set of posts from the filesystem and derive a tag object", () => {
    const authors = getAuthors();
    expect(Object.keys(authors)[0]).toEqual("Author-One");
    expect(Object.keys(authors)[1]).toEqual("Author-Two");
    expect(authors[Object.keys(authors)[0]]).toHaveLength(1);
    expect(authors[Object.keys(authors)[2]]).toHaveLength(1);
  });

  it("should return a list of posts for a single author slug", () => {
    const authorPosts = getAuthorPostsBySlug("Testy-McTestface");
    expect(authorPosts).toHaveLength(1);
    expect(authorPosts[0].title).toEqual("Three post");
    expect(authorPosts[0].author[0]).toEqual("Testy McTestface");
  });

  it("should return a list of Next.js StaticPath objects for author", () => {
    const paths = getStaticAuthorPaths();
    expect(paths).toBeInstanceOf(Array);
    expect(paths).toHaveLength(3);
    expect(paths[0].params.authorSlug).toEqual("Author-One");
    expect(paths[1].params.authorSlug).toEqual("Author-Two");
  });

  it("should provide an automatic excerpt for a post", () => {
    const posts = getPosts<PostData>();

    expect(posts[0].excerpt).toBe("Hello welcome to the first test post this is a heading to see if HTML is includes paragraph under the heading do we get new lines...");
  });

  it("should provide an automatic excerpt for a post and remove markdown syntax", () => {
    const posts = getPosts<PostData>();

    expect(getPostByKey(posts, "title", "A Complicated Post").excerpt)
      .toBe("A really early link Strong Bold Text followed by Italics A quotation An Image Alt Tag...");
  });

  it("should respect an existing excerpt for a post", () => {
    const posts = getPosts<PostData>();

    expect(posts[1].excerpt).not.toBe("Hello welcome to the two test post");
    expect(posts[1].excerpt).toBe("A Custom Post Excerpt");
  });
});

describe("filesystem-fns", () => {
  it("should find a valid directory in an array of paths", () => {
    const dirs = [
      "/path/to/nowhere",
      "/beaten/path",
      getPostsDefaultOptions.directory,
    ];
    const directory = findValidDirectory(dirs);
    const posts = getPosts<PostData>(getPostsDefaultOptions);
    expect(directory).toBe(getPostsDefaultOptions.directory);
    expect(posts[0].path).toEqual("/test-posts/post");
  });
});
