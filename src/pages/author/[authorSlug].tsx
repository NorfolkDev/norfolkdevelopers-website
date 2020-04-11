import { useCallback } from "react";
import { GetStaticProps } from "next";
import { slugify } from "../../lib/slugify";
import { FrontMatter } from "../../lib/blog-engine";
import Layout from "../../components/layout/Layout";
import config from "../../../site.config";

export async function getStaticPaths() {
  const { getAuthors } = require("../../lib/blog-engine");

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
  const { getAuthors } = require("../../lib/blog-engine");
  let authorSlug =
    params && params.authorSlug[0]
      ? params.authorSlug[0] || `${params.authorSlug}`
      : "asd";
  return {
    props: {
      posts: getAuthors()[authorSlug],
      slug: authorSlug,
    },
  };
};

type Props = {
  posts: FrontMatter[];
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
        {posts.map((post: FrontMatter) => (
          <div key={post.title}>{post.title}</div>
        ))}
      </main>
    </Layout>
  );
}
