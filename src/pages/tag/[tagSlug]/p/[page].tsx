import siteConfig from "site.config";
import { GetStaticProps } from "next";
import Layout from "src/components/layout/Layout";
import PostCard from "src/components/PostCard";
import PageMeta from "src/components/PageMeta";
import Pagination from "src/components/Pagination";
import { Post } from "contentlayer/generated";

export async function getStaticPaths() {
  // @TODO: Fix all of this stuff :S
  // const posts = getTags();
  const posts: Post[] = [];
  const paths = Object.keys(posts)
    .map((tagSlug) => ({
      tagSlug,
      posts: [],
    }))
    .filter(tag => tag.posts.length > siteConfig.settings.postsPerPage)
    .map(tag => {
      let totalPages = Math.ceil(tag.posts.length / siteConfig.settings.postsPerPage);
      let paginator = new Array(totalPages - 1).fill(null);

      return paginator.map((_, i) => ({
        params: {
          tagSlug: tag.tagSlug,
          page: (i + 2).toString()
        }
      }));
    })
    .flat();

  return {
    paths,
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
  // @TODO: Fix all of this stuff :S
  // const posts = getTags();
  const posts: Post[] = [];
  const tagSlug = params?.tagSlug as string;
  const page: number = Number(params?.page || "2");
  const pointer: number = (page - 1) * siteConfig.settings.postsPerPage;

  return {
    props: {
      posts: posts,
      total: posts.length,
      page,
      tagSlug,
    },
  };
};

export default function TagSlug({ posts, page, total, tagSlug }: Props) {
  return (
    <Layout location="words">
      <PageMeta title={`Posts Tagged: ${tagSlug} (Page: ${page})`} />

      <h1
        className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl ck
      mr-auto ml-auto"
      >
        <span className="text-red-500 font-bold">/</span>
        tag
        <span className="mx-2 text-red-500 font-bold">/</span>
        {tagSlug}
        <span className="mx-2 text-red-500 font-bold">/</span>
        {page}
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ul className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </ul>

        <Pagination
          root={`/tag/${tagSlug}`}
          seperator={`${tagSlug}/p`}
          page={page}
          total={total}
          perPage={siteConfig.settings.postsPerPage}
        />
      </main>
    </Layout>
  );
}
