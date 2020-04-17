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
        <p className="hashtag tracking-tight leading-tight text-2xl md:text-5xl">
          Hello, I'm Shaun. I build{" "}
          <span className="border-b-4 font-bold border-blue-500">software</span>{" "}
          for a living and pretend to have time to write{" "}
          <a
            href="https://soundcloud.com/shaunchurch"
            className="border-b-4 font-bold border-green-500"
          >
            music
          </a>{" "}
          and{" "}
          <Link href="/words">
            <a className="border-b-4 font-bold border-yellow-500">words</a>
          </Link>
          .
        </p>

        <p className="tracking-tight text-lg mt-6 mb-12 md:text-xl">
          –{" "}
          <a
            className="text-pink-500 hover:text-gray-600"
            href="https://twitter.com/shaunchurch"
          >
            @shaunchurch
          </a>
        </p>
        <header className="flex flex-row items-center">
          <h2 className="text-base uppercase border-b-4 border-background-secondary tracking-widest my-6 text-foreground-secondary">
            Featured projects
          </h2>
          {/* <Link href="/words">
            <a className="ml-auto text-foreground-secondary">
              All projects &raquo;
            </a>
          </Link> */}
        </header>
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 -mx-4 mb-8">
          <div className="row-span-2">
            <FeatureCard
              title="Songwriter's Notebook"
              description="Used by hundreds of songwriters all over the world to capture their creative ideas."
              imagePath="/static/images/pages/index/room1.jpg"
              buttonCTA="Buy app"
              buttonLink="https://play.google.com/store/apps/details?id=com.shaunchurch.songwriter.app"
              color={FeatureThemes.blue}
            />
          </div>
          <div className="md:row-span-2">
            <FeatureCard
              title="Lyric Sheet"
              description="Shhh. Get live lyrics from last.fm to your desktop."
              imagePath="/static/images/pages/index/room2.jpg"
              buttonCTA="Get app"
              buttonLink="https://github.com/shaunchurch/lastfm-lyricsheet"
              color={FeatureThemes.green}
            />
          </div>
          {/* <div className="md:row-span-2">
            <FeatureCard
              title="Featured app"
              description="Awesome app used by people."
              imagePath="/static/images/pages/index/room1.jpg"
              buttonCTA="Get app"
              buttonLink="http://google.com"
              color={FeatureThemes.pink}
            />
          </div> */}
        </div>
        <header className="flex flex-row items-center">
          <h2 className="text-base uppercase border-b-4 border-background-secondary tracking-widest my-8 text-foreground-secondary">
            Latest posts
          </h2>
          <span className="inline-block "></span>
          <Link href="/words">
            <a className="ml-auto text-foreground-primary">All posts &raquo;</a>
          </Link>
        </header>
        <ul className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.path} post={post} />
          ))}
        </ul>
      </main>
    </Layout>
  );
}
