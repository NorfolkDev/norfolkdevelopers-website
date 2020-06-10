import config from "../../../site.config";
import { GetStaticProps } from "next";
import { PostData, getTags } from "@static-fns/blog";

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
  posts: PostData[];
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
