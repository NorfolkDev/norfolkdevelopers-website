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
      <main className="mt-12 md:mt-6">
        <p className="text-2xl md:text-4xl">
          Hello, this is the <strong>awkward introduction</strong> blurb on the
          website.
        </p>

        <p className="text-lg mt-6 mb-12 md:text-xl">
          Some further explanation to clarify the poorly written sentence above,
          maybe follow on{" "}
          <a
            className="text-blue-600 hover:text-pink-600"
            href="https://twitter.com"
          >
            @twitter
          </a>
          .
        </p>

        <header className="flex flex-row items-center">
          <h2 className="text-base uppercase tracking-widest my-6 text-foreground-secondary">
            Latest posts
          </h2>
          <Link href="/words">
            <a className="ml-auto">All posts &raquo;</a>
          </Link>
        </header>
        <ul className="-mx-8">
          {posts.map((post) => (
            <Link href={post.path || "/"}>
              <a>
                <li className="flex flex-col md:flex-row border-l-2 border-green-300 bg-background-secondary md:rounded mb-6 py-6 px-6">
                  <div className="mr-6 w-full mb-4 md:mb-0 md:w-2/12">
                    {post.tags && <TagList tags={post.tags} />}
                  </div>
                  <div className="flex flex-col w-10/12">
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
