import React from "react";
import PostTemplate from "./PostTemplate";
import JobTemplate from "./JobTemplate";
import NorDevCon from "./NorDevCon";

const layouts = {
  post: PostTemplate,
  job: JobTemplate,
};

type Props = {
  frontMatter: {
    layout: "job" | "post";
  };
};

const Wrapper: React.FC<Props> = ({ frontMatter, ...props }) => {
  const Layout = layouts[frontMatter.layout];

  return <Layout {...props} frontMatter={frontMatter} />;
};

export const MDXComponents = {
  wrapper: Wrapper,
  NorDevCon: NorDevCon,
};
