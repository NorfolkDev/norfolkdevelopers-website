import Layout from "./Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { slugify } from "../../lib/slugify";

export default function PostTemplate({ frontMatter, children }) {
  const router = useRouter();

  return (
    <Layout>
      <article className="mt-8 lg:max-w-3xl mr-auto ml-auto">
        {frontMatter.date && (
          <pre className="inset inline-block text-gray-600 text-sm">
            {frontMatter.date}
          </pre>
        )}
        <pre className="inset block text-gray-600 text-sm">{router.asPath}</pre>
        <h1 className="inset hashtag mt-2 mb-2 text-5xl font-bold leading-none">
          {frontMatter.title}
        </h1>
        {frontMatter.tags ? (
          <pre className="inset">
            {frontMatter.tags.map(tag => (
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
        {frontMatter.author ? (
          <span className="inset block text-base mt-4 text-gray-600">
            by{[" "]}
            {frontMatter.author.map((author, i) => (
              <span key={author}>
                <Link href={`/author/${slugify(author)}`}>
                  <a className="underline">{author}</a>
                </Link>
                {i < frontMatter.author.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        ) : null}
        <main className="typography inset mt-8">{children}</main>
      </article>
    </Layout>
  );
}
