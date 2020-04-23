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
        <header className="flex flex-row items-center">
          <h2 className="text-base uppercase border-b-4 border-background-secondary tracking-widest my-8 text-foreground-secondary">
            Latest posts
          </h2>
          <span className="inline-block "></span>
          <Link href={`/${siteConfig.postsDirectory}`}>
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
