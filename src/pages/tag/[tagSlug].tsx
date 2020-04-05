import config from "../../../site.config";
import { GetStaticProps } from "next";
import { FrontMatter } from "../../lib/blog-engine";

export async function getStaticPaths() {
  if (!config.features.tagPages) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const { getTags } = require("../../lib/blog-engine");

  return {
    paths: Object.keys(getTags()).map((tag) => {
      return { params: { tagSlug: tag } };
    }),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getTags } = require("../../lib/blog-engine");
  let tagSlug =
    params && params.tagSlug[0]
      ? params.tagSlug[0] || `${params.tagSlug}`
      : "asd";

  return {
    props: {
      posts: getTags()[tagSlug],
    },
  };
};

type Props = {
  posts: FrontMatter[];
};
export default function TagSlug({ posts }: Props) {
  return (
    <div>
      Tagslug
      {posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}
