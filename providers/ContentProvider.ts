import { allJobs, allPosts, Job, Post } from "contentlayer/generated";
import { compareDesc, isPast } from "date-fns";
import { slugify } from "src/slugify";

/* 
 * Index Methods - Return simply the slugs of content
 */
export function getPostTagSlugs(): string[] {
  const tagSlugs = allPosts
    .reduce((t: string[], post: Post) => [...t, ...post.tagList], [])
    .map((tag) => slugify(tag.toLowerCase()));

  return [...new Set(tagSlugs)];
}

export function getPostAuthorSlugs(): string[] {
  const authorSlugs = allPosts
    .reduce((a: string[], post: Post) => [...a, ...post.authors], [])
    .map((author) => slugify(author.toLowerCase()));

  return [...new Set(authorSlugs)];
}

/* 
 * Get Methods - Return sorted arrays of content
 */
export function getPosts(): Post[] {
  return allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getJobs(expired: boolean = false): Job[] {
  return allJobs
    .filter((job) => isPast(new Date(job.expiryDate)) === expired)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

/* 
 * Lookup Methods - Uses a slug to collect content by it's slug
 */
export function getPostsByTagSlug(tagSlug: string): Post[] {
  return allPosts
    .filter((post: Post) => 
      post.tagList
        .map((tag: string) => slugify(tag.toLowerCase()))
        .includes(tagSlug)
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getPostsByAuthorSlug(authorSlug: string): Post[] {
  return allPosts
    .filter((post: Post) =>
      post.authors
        .map((author: string) => slugify(author.toLowerCase()))
        .includes(authorSlug))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getAuthorFromAuthorSlug(authorSlug: string) {
  return allPosts
    .reduce((a: string[], post: Post) => [...a, ...post.authors], [])
    .find((author: string) => slugify(author.toLowerCase()) === authorSlug);
}

export function getTagFromTagSlug(tagSlug: string) {
  return allPosts
    .reduce((t: string[], post: Post) => [...t, ...post.tagList], [])
    .find((tag: string) => slugify(tag.toLowerCase()) === tagSlug);
}
