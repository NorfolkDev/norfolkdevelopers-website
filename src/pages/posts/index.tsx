import Link from "next/link";
import Layout from "../../components/layout/Layout";
import siteConfig from "../../../site.config";
import { getPosts, PostData } from "@static-fns/blog";
import PostCard from "../../components/PostCard";
import PageMeta from "../../components/PageMeta";

export async function getStaticProps() {
  return { props: { posts: JSON.parse(JSON.stringify(getPosts())) } };
}

type Props = {
  posts: PostData[];
};

export default function WordsRoute({ posts }: Props) {
  const sum = 1 + 1;
  return (
    <Layout location="words">
      <PageMeta title="Posts" />

      <section className="section" id="posts">
        <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
          <span className="text-red-500 font-bold">/</span>
          {siteConfig.postsDirectory}
        </h1>
        <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
          <ul className="-mx-4">
            {posts.map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
          </ul>
        </main>
      </section>
    </Layout>
  );
}
