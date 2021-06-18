import { GetStaticProps } from "next";
import siteConfig from "../../../../site.config";
import Layout from "../../../components/layout/Layout";
import PageMeta from "../../../components/PageMeta";
import PostCard from "../../../components/PostCard";
import Pagination from "../../../components/Pagination";
import { getPosts } from "src/lib/blog/blog-fns";
import { PostData } from "src/DataTypes";

export async function getStaticPaths() {
  const posts = getPosts();
  const paths = new Array(
    Math.floor(posts.length / siteConfig.settings.postsPerPage)
  ).fill(null);

  return {
    paths: paths.map((_, page) => ({
      params: { page: (page + 2).toString() },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getPosts();
  const page: number = Number(params?.page || "2");
  const pointer: number = (page - 1) * siteConfig.settings.postsPerPage;

  return {
    props: {
      posts: posts.slice(pointer, pointer + siteConfig.settings.postsPerPage),
      page,
      total: posts.length,
    },
  };
};

type Props = {
  posts: PostData[];
  page: number;
  total: number;
};

export default function WordsRoute({ posts, page, total }: Props) {
  return (
    <Layout location="words">
      <PageMeta title={`Posts (Page ${page})`} />

      <section className="section" id="posts">
        <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
          <span className="text-red-500 font-bold">/</span>
          {siteConfig.postsDirectory}
          <span className="mx-2 text-red-500 font-bold">/</span>
          {page}
        </h1>
        <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
          <ul className="-mx-4">
            {posts.map((post) => (
              <PostCard key={post.path} post={post} />
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
