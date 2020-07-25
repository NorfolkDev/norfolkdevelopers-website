import siteConfig from "site.config";
import { GetStaticProps } from "next";
import { PostData, getTags, getStaticTagPaths } from "@static-fns/blog";
import Layout from "src/components/layout/Layout";
import PostCard from "src/components/PostCard";

export async function getStaticPaths() {
  if (!siteConfig.features.tagPages) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths: getStaticTagPaths(),
    fallback: false,
  };
}

type Props = {
  posts: PostData[];
  tagSlug: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tagSlug = params?.tagSlug as string;
  const posts = getTags();
  const tagPosts = posts[tagSlug];

  return {
    props: {
      posts: tagPosts, // posts,
      tagSlug,
    },
  };
};

export default function TagSlug({ posts, tagSlug }: Props) {
  return (
    <Layout location="words">
      <h1
        className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl ck
      mr-auto ml-auto"
      >
        /tag/{tagSlug}
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ul className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.path} post={post} />
          ))}
        </ul>
      </main>
    </Layout>
  );
}
