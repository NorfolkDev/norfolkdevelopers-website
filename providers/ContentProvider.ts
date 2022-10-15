import { allJobs, allPosts, Job, Post } from "contentlayer/generated";
import { compareDesc, isPast } from "date-fns";
import siteConfig from "site.config";

export function getPosts(): Post[] {
  return allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getPostsByTag(tag: string): Post[] {
  return allPosts
    .filter((post: Post) => post.tagList.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}
}

export function getJobs(expired: boolean = false): Job[] {
  return allJobs
    .filter((job) => isPast(new Date(job.expiryDate)) === expired)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

