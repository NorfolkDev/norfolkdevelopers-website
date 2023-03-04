import rehypePrism from "@mapbox/rehype-prism";
import remarkGfm from 'remark-gfm'
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import removeMarkdown from "remove-markdown";
import siteConfig from "./site.config";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    author: {
      type: "string",
      description: "The author of the post",
      required: true,
    },
    tags: {
      type: "string",
    },
    hero: {
      type: "string",
    },
    layout: {
      type: "string",
    },
    canonical: {
      type: "string",
    },
    sponsored: {
      type: "boolean",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    editUrl: {
      type: "string",
      resolve: (post) =>
        `${siteConfig.githubUrl}edit/master/content/${post._raw.sourceFilePath}`,
    },
    slug: {
      type: "string",
      // @TODO: Investigate removing the call to the replace method, is there a better contentlayer prop?
      resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
    },
    // @TODO: Support these natively in the markdown posts (with actual yaml lists)
    authors: {
      type: "array",
      resolve: (post) => post.author.split(", "),
    },
    tagList: {
      type: "array",
      resolve: (post) => post.tags.split(", "),
    },
    excerpt: {
      type: "string",
      resolve: (post) => removeMarkdown(post.body.raw).slice(0, 280) + "...",
    },
  },
}));

export const Job = defineDocumentType(() => ({
  name: "Job",
  contentType: "mdx",
  filePathPattern: "jobs/**/*.mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the job",
      required: true,
    },
    date: {
      type: "date",
      description: "The date the job was posted",
      required: true,
    },
    expiryDate: {
      type: "date",
      description: "The date the job was posted",
      required: true,
    },
    role: {
      type: "string",
      description: "The job role",
      required: true,
    },
    salary: {
      type: "string",
      description: "The job salary",
      required: true,
    },
    company: {
      type: "string",
      description: "The company that's recruiting for this role",
      required: true,
    },
    location: {
      type: "string",
      description:
        "The location required for this role (Remote is a valid option)",
      required: true,
    },
    seniority: {
      type: "string",
      description: "What seniority is this position (e.g. Senior, Junior etc)",
      required: true,
    },
    apply: {
      type: "string",
      description:
        "How should applicants apply (Used as a link, mailto is a valid option)",
      required: true,
    },
    layout: {
      type: "string",
      description:
        "How should applicants apply (Used as a link, mailto is a valid option)",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/jobs/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Job],
  mdx: {
    rehypePlugins: [rehypePrism],
    remarkPlugins: [remarkGfm],
  },
});
