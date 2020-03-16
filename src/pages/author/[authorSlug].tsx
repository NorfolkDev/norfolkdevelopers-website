import { useCallback } from "react";
import { slugify } from "../../lib/slugify";
import Layout from "../../components/layout/Layout";

export async function getStaticPaths() {
  const { getAuthors } = require("../../lib/blog-engine");
  return {
    paths:
      Object.keys(getAuthors()).map(author => {
        return { params: { authorSlug: author } };
      }) || [],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { getAuthors } = require("../../lib/blog-engine");
  return {
    props: {
      posts: getAuthors()[params.authorSlug],
      slug: params.authorSlug
    }
  };
}

export default function AuthorSlug({ posts, slug }) {
  const findAuthorName = useCallback(
    (posts, slug) => {
      let thisAuthor = "";
      posts[0].author.forEach(author =>
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
        {posts.map(post => (
          <div key={post.title}>{post.title}</div>
        ))}
      </main>
    </Layout>
  );
}
