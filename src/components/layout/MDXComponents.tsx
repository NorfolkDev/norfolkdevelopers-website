import React from 'react';
import PostTemplate from "./PostTemplate";
import JobTemplate from "./JobTemplate";
import AuthorTemplate from "./AuthorTemplate";

const layouts = {
  job: JobTemplate,
  post: PostTemplate,
  author: AuthorTemplate,
}

type WrapperProps = {
  frontMatter: {
    layout: 'job' | 'post' | 'author';
  }
}

const Wrapper: React.FC<WrapperProps> = ({ frontMatter, ...props }) => {
  const Layout = layouts[frontMatter.layout];

  return <Layout {...props} frontMatter={frontMatter} />
}

export const MDXComponents = {
  wrapper: Wrapper,
};
