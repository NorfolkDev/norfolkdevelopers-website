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

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      // @ts-ignore
      posts: getTags()[params.tagSlug],
    },
  };
};

type Props = {
  posts: FrontMatter[];
};
export default function TagSlug({ posts }: Props) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.title}>{post.title}</div>
      ))}
    </div>
  );
}
