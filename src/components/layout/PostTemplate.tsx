import Layout from "./Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { slugify } from "../../lib/slugify";
import Head from "next/head";

export default function PostTemplate({ frontMatter: post, children }) {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="article mt-8 lg:max-w-3xl mr-auto ml-auto">
        {post.date && (
          <pre className="inset inline-block text-gray-500 text-sm">
            {post.date}
          </pre>
        )}
        <pre className="inset block text-gray-500 text-sm">{router.asPath}</pre>
        <h1 className="inset hashtag mt-2 mb-2 text-5xl font-bold leading-tight">
          {post.title}
        </h1>
        {post.tags ? (
          <pre className="inset">
            {post.tags.map(tag => (
              <span
                className=" rounded-full bg-gray-200 p-1 mr-2 text-xs font-bold text-gray-600"
                key={tag}
              >
                <Link href={`/tag/${tag}`}>
                  <a> #{tag} </a>
                </Link>
              </span>
            ))}
          </pre>
        ) : null}
        {post.author ? (
          <span className="inset block text-base mt-4 text-gray-600">
            by{[" "]}
            {post.author.map((author, i) => (
              <span key={author}>
                <Link href={`/author/${slugify(author)}`}>
                  <a className="underline">{author}</a>
                </Link>
                {i < post.author.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        ) : null}
        <main className="typography inset mt-8">{children}</main>
      </article>
    </Layout>
  );
}
