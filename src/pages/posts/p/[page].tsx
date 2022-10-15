import { GetStaticProps } from "next";
import siteConfig from "../../../../site.config";
import Layout from "../../../components/layout/Layout";
import PageMeta from "../../../components/PageMeta";
import PostCard from "../../../components/PostCard";
import Pagination from "../../../components/Pagination";
import { allPosts, Post } from "contentlayer/generated";
import { getPosts } from "providers/ContentProvider";

export async function getStaticPaths() {
  let posts = getPosts();
  let paths = Array.from({
    length: Math.floor(posts.length / siteConfig.settings.postsPerPage),
  }).map((_, page) => ({
    params: {
      page: (page + 2).toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page: number = Number(params?.page || "2");
  const pointer: number = (page - 1) * siteConfig.settings.postsPerPage;
  const posts: Post[] = getPosts();

  return {
    props: {
      posts: posts.slice(pointer, pointer + siteConfig.settings.postsPerPage),
      page,
      total: posts.length,
    },
  };
};

type Props = {
  posts: Post[];
  page: number;
  total: number;
};

export default function WordsRoute({ posts, page, total }: Props) {
  return (
    <Layout location="words">
      <PageMeta title={`Posts (Page ${page})`} />

      <section className="section" id="posts">
        <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl">
          <span className="font-bold text-red-500">/</span>
          {siteConfig.postsDirectory}
          <span className="mx-2 font-bold text-red-500">/</span>
          {page}
        </h1>
        <main className="block mt-4 border-gray-600 important:mr-auto important:ml-auto">
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
