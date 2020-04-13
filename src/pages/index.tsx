import Layout from "../components/layout/Layout";
import Head from "next/head";
import siteConfig from "../../site.config";
import { FrontMatter } from "../lib/blog-engine";
import Link from "next/link";
import PostCard from "../components/PostCard";
import FeatureCard, { FeatureThemes } from "../components/FeatureCard";

type Props = {
  posts: FrontMatter[]; // TODO Type posts
};

export async function getStaticProps() {
  const { getPosts } = require("../lib/blog-engine");
  return { props: { posts: getPosts().slice(0, 3) } };
}

export default function IndexRoute({ posts }: Props) {
  return (
    <Layout>
      <Head>
        <title>{siteConfig.siteName}</title>
      </Head>
      <main className="mt-12 md:mt-6">
        <p className="tracking-tight leading-tight text-2xl md:text-4xl">
          Hello, this is the <strong>awkward introduction</strong> blurb on the
          website.
        </p>

        <p className="tracking-tight text-lg mt-6 mb-12 md:text-xl">
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
        <ul className="-mx-4">
          {posts.map((post) => (
            <Link href={post.path || "/"}>
              <a>
                <PostCard post={post} />
              </a>
            </Link>
          ))}
        </ul>

        <header className="flex flex-row items-center">
          <h2 className="text-base uppercase tracking-widest my-6 text-foreground-secondary">
            Featured projects
          </h2>
          <Link href="/words">
            <a className="ml-auto">All projects &raquo;</a>
          </Link>
        </header>
        <div className="md:grid md:grid-cols-2 md:grid-rows-4 md:gap-4 -mx-4">
          <div className="row-span-4">
            <FeatureCard
              title="Songwriter's Notebook"
              description="Used by hundreds of songwriters all over the world to capture their creative ideas."
              imagePath="/static/images/pages/index/room1.jpg"
              buttonCTA="Buy app"
              buttonLink="http://google.com"
              color={FeatureThemes.orange}
            />
          </div>
          <div className="md:row-span-2">
            <FeatureCard
              title="Featured app"
              description="Awesome app used by people."
              imagePath="/static/images/pages/index/room2.jpg"
              buttonCTA="Get app"
              buttonLink="http://google.com"
              color={FeatureThemes.green}
            />
          </div>
          <div className="md:row-span-2">
            <FeatureCard
              title="Featured app"
              description="Awesome app used by people."
              imagePath="/static/images/pages/index/snb-image.jpg"
              buttonCTA="Get app"
              buttonLink="http://google.com"
              color={FeatureThemes.pink}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
