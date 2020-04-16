import Link from "next/link";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import siteConfig from "../../../site.config";
import { FrontMatter } from "../../lib/blog-engine";
import PostCard from "../../components/PostCard";

export async function getStaticProps() {
  const { getPosts } = require("../../lib/blog-engine");
  return { props: { posts: getPosts() } };
}

type Props = {
  posts: FrontMatter[];
};

export default function WordsRoute({ posts }: Props) {
  const sum = 1 + 1;
  return (
    <Layout location="words">
      <Head>
        <title>{siteConfig.siteName}/words </title>
      </Head>
      <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
        /words
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ul className="-mx-4">
          {posts.map((post) => (
            <Link href={post.path || "/"}>
              <a>
                <PostCard post={post} />
              </a>
            </Link>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
