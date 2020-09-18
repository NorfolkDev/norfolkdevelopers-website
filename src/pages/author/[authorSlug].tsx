import { useCallback } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getAuthors } from "@static-fns/blog";
import Layout from "../../components/layout/Layout";
import PostCard from "../../components/PostCard";
import siteConfig from "../../../site.config";
import { slugify } from "src/slugify";
import PageMeta from "../../components/PageMeta";
import { PostData } from "src/DataTypes";

export async function getStaticPaths() {
  // no pagesif disables
  if (!siteConfig.features.authorPages) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths:
      Object.keys(getAuthors()).map((author) => {
        return { params: { authorSlug: author } };
      }) || [],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      // @ts-ignore
      posts: getAuthors()[params.authorSlug],
      // @ts-ignore
      slug: params.authorSlug,
    },
  };
};

type Props = {
  posts: PostData[];
  slug: string;
};
export default function AuthorSlug({ posts, slug }: Props) {
  const findAuthorName = useCallback(
    (posts, slug) => {
      let thisAuthor = "";
      posts[0].author.forEach((author: string) =>
        slugify(author) === slug ? (thisAuthor = author) : null
      );
      return thisAuthor;
    },
    [slug]
  );

  let title = `Posts by: ${findAuthorName(posts, slug)}`;

  return (
    <Layout>
      <PageMeta title={title} />

      <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
        {title}
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ol className="-mx-4">
          {posts.map((post: PostData) => (
            <PostCard key={post.path} post={post} />
          ))}
        </ol>
      </main>
    </Layout>
  );
}
