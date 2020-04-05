import Layout from "../components/layout/Layout";
import Head from "next/head";
import siteConfig from "../../site.config";
import { FrontMatter } from "../lib/blog-engine";
import { dateFormat } from "../lib/date-functions";
import Link from "next/link";
import TagList from "../components/TagList";

export async function getStaticProps() {
  const { getPosts } = require("../lib/blog-engine");
  return { props: { posts: getPosts().slice(0, 3) } };
}

type Props = {
  posts: FrontMatter[]; // TODO Type posts
};

export default function IndexRoute({ posts }: Props) {
  return (
    <Layout>
      <Head>
        <title>{siteConfig.siteName}</title>
      </Head>
      <main className="inset">
        <p className="text-5xl">
          Hello, this is{" "}
          <span className="font-bold">{siteConfig.siteName}</span> 👋
        </p>

        <header className="flex flex-row items-center">
          <h2 className="text-2xl my-6 font-bold text-foreground-secondary">
            Latest posts
          </h2>
          <Link href="/words">
            <a className="ml-auto">All posts &raquo;</a>
          </Link>
        </header>
        <ul>
          {posts.map((post) => (
            <Link href={post.path || "/"}>
              <a>
                <li className="flex flex-row border-l-2 border-green-300 bg-background-secondary rounded mb-4 py-6 px-6">
                  <div className="w-1/6 mr-6">
                    {post.tags && <TagList tags={post.tags} />}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl">{post.title}</h2>
                    {post.date && (
                      <span className="inline text-foreground-secondary text-sm font-bold">
                        {dateFormat(new Date(post.date))}
                      </span>
                    )}
                    <p className="text-foreground-primary mt-4">
                      {post.excerpt}
                    </p>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
