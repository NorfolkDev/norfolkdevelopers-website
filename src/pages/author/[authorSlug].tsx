import { useCallback } from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import PostCard from "../../components/PostCard";
import { slugify } from "src/slugify";
import PageMeta from "../../components/PageMeta";
import { Post } from "contentlayer/generated";
import { getPostAuthors, getPostsByAuthor } from "providers/ContentProvider";

export async function getStaticPaths() {
  let paths = getPostAuthors().map((authorSlug) => ({
    params: { authorSlug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorSlug = params?.authorSlug as string;
  let posts = getPostsByAuthor(authorSlug);

  return {
    props: {
      posts,
      authorSlug,
    },
  };
};

type Props = {
  posts: Post[];
  authorSlug: string;
};

export default function AuthorSlug({ posts, authorSlug }: Props) {
  let title = `Posts by: ${authorSlug}}`;

  return (
    <Layout>
      <PageMeta title={title} />

      <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
        {title}
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ol className="-mx-4">
          {posts.map((post: Post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </ol>
      </main>
    </Layout>
  );
}
