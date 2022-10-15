import { useCallback } from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import PostCard from "../../components/PostCard";
import { slugify } from "src/slugify";
import PageMeta from "../../components/PageMeta";
import { Post } from "contentlayer/generated";
import {
  getAuthorFromAuthorSlug,
  getPostAuthorSlugs,
  getPostsByAuthorSlug,
} from "providers/ContentProvider";

export async function getStaticPaths() {
  let paths = getPostAuthorSlugs().map((authorSlug) => ({
    params: { authorSlug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let authorSlug = params?.authorSlug as string;
  let posts = getPostsByAuthorSlug(authorSlug);
  let author = getAuthorFromAuthorSlug(authorSlug);

  return {
    props: {
      posts,
      author,
    },
  };
};

type Props = {
  posts: Post[];
  author: string;
};

export default function AuthorSlug({ posts, author }: Props) {
  let title = `Posts by: ${author}`;

  return (
    <Layout>
      <PageMeta title={title} />

      <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl">
        {title}
      </h1>
      <main className="block mt-4 border-gray-600 important:mr-auto important:ml-auto">
        <ol className="-mx-4">
          {posts.map((post: Post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </ol>
      </main>
    </Layout>
  );
}
