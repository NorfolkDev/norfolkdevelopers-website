import siteConfig from "site.config";
import { GetStaticProps } from "next";
import Layout from "src/components/layout/Layout";
import PostCard from "src/components/PostCard";
import PageMeta from "../../components/PageMeta";
import Pagination from "../../components/Pagination";
import { Post } from "contentlayer/generated";

export async function getStaticPaths() {
  // @TODO: Actually import the available tags
  return {
    paths: [],
    fallback: false,
  };
}

type Props = {
  posts: Post[];
  page: number;
  total: number;
  tagSlug: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tagSlug = params?.tagSlug as string;
  // @TODO: Actually import the tags
  const tagPosts: Post[] = [];

  return {
    props: {
      page: 1,
      posts: tagPosts.slice(0, siteConfig.settings.postsPerPage),
      total: tagPosts.length,
      tagSlug,
    },
  };
};

export default function TagSlug({ posts, page, total, tagSlug }: Props) {
  return (
    <Layout location="words">
      <PageMeta title={`Posts Tagged: ${tagSlug}`} />

      <h1
        className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl ck
      mr-auto ml-auto"
      >
        <span className="text-red-500 font-bold">/</span>
        tag
        <span className="text-red-500 font-bold">/</span>
        {tagSlug}
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ul className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </ul>

        <Pagination
          root="/tag"
          seperator={`${tagSlug}/p`}
          page={page}
          total={total}
          perPage={siteConfig.settings.postsPerPage}
        />
      </main>
    </Layout>
  );
}
