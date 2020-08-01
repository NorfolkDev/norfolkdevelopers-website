import Layout from "./Layout";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import siteConfig from "site.config";
import TagList from "src/components/TagList";
import { slugify } from "src/slugify";
import PageMeta from "../PageMeta";
import { formatDistanceToNow } from "date-fns";
import { dateFormat } from "src/dateFormat";

type Props = {
  frontMatter: any;
  children?: any;
};

export default function PostTemplate({ frontMatter: post, children }: Props) {
  const router = useRouter();
  let editUrl = `${siteConfig.githubUrl}edit/master/src/pages/${router.pathname}/index.mdx`

  return (
    <Layout>
      <PageMeta
        title={post.title}
        image={post.hero ? `${siteConfig.rootUrl}${post.hero}` : undefined}
        description={post.excerpt}
      />

      <article className="article mt-8 lg:max-w-3xl mr-auto ml-auto">
        <header className="inset mb-12">
          <TagList tags={post.tags} />

          <h1 className="hashtag mt-2 mb-1 text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          {post.author && siteConfig.features.authorPages ? (
            <span className="block text-base text-gray-600">
              by{[" "]}
              {post.author.map((author: string, i: number) => (
                <span key={author}>
                  <Link
                    href="/author/[authorSlug]"
                    as={`/author/${slugify(author)}`}
                  >
                    <a className="underline">{author}</a>
                  </Link>
                  {i < post.author.length - 1 ? ", " : ""}
                </span>
              ))}
              {' - '}
              Posted {formatDistanceToNow(new Date(post.date))} ago
            </span>
          ) : null}
          <p className="my-2">Closes {dateFormat(new Date(post.expiryDate))}</p>
          {post.hero && <img className="mt-12 mb-12" src={post.hero} />}
        </header>
        <div className="typography">{children}</div>
        <footer className="mt-6 py-4 text-base">
          <a className="text-foreground-secondary hover:text-foreground-primary hover:underline" href={editUrl} target="_blank" rel="nofollow">
            Edit this post on GitHub
          </a>
        </footer>
      </article>
    </Layout>
  );
}
