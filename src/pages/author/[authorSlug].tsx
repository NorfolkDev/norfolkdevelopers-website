import { useCallback } from "react";
import { GetStaticProps } from "next";
import { PostData, getAuthors, slugify } from "@static-fns/blog";
import Layout from "../../components/layout/Layout";
import config from "../../../site.config";

export async function getStaticPaths() {
  // no pagesif disables
  if (!config.features.authorPages) {
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

  return (
    <Layout>
      <h1 className="inset">{findAuthorName(posts, slug)}</h1>
      <main className="inset">
        {posts.map((post: PostData) => (
          <div key={post.title}>{post.title}</div>
        ))}
      </main>
    </Layout>
  );
}
