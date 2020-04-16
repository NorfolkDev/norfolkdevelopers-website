import config from "../../../site.config";
import { GetStaticProps } from "next";
import { FrontMatter, getTags } from "../../lib/blog-engine";

export async function getStaticPaths() {
  if (!config.features.tagPages) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths = Object.keys(getTags()).map((tag) => {
    return { params: { tagSlug: tag } };
  });
  console.log("paths", paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params", params);
  let tagSlug =
    params && params.tagSlug[0]
      ? params.tagSlug[0] || `${params.tagSlug}`
      : "asd";
  console.log("tagslug", tagSlug);

  return {
    props: {
      posts: [], //getTags()[tagSlug],
    },
  };
};

type Props = {
  posts: FrontMatter[];
};
export default function TagSlug({ posts }: Props) {
  return (
    <div>
      yo
      {/* Tagslug
      {posts.map((post) => (
        <div>{post.title}</div>
      ))} */}
    </div>
  );
}
