import Layout from "../../components/layout/Layout";
import siteConfig from "../../../site.config";
import PostCard from "../../components/PostCard";
import PageMeta from "../../components/PageMeta";
import Pagination from "../../components/Pagination";
import { allPosts, Post } from "contentlayer/generated";

export async function getStaticProps() {
  return {
    props: {
      page: 1,
      posts: allPosts.slice(0, siteConfig.settings.postsPerPage),
      total: allPosts.length,
    },
  };
}

type Props = {
  posts: Post[];
  page: number;
  total: number;
};

export default function WordsRoute({ posts, page, total }: Props) {
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
              <PostCard key={post.url} post={post} />
            ))}
          </ul>

          <Pagination
            root="/posts"
            seperator="p"
            page={page}
            total={total}
            perPage={siteConfig.settings.postsPerPage}
          />
        </main>
      </section>
    </Layout>
  );
}
