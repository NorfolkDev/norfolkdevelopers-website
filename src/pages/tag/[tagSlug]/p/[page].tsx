import siteConfig from "site.config";
import { GetStaticProps } from "next";
import Layout from "src/components/layout/Layout";
import PostCard from "src/components/PostCard";
import PageMeta from "src/components/PageMeta";
import Pagination from "src/components/Pagination";
import { Post } from "contentlayer/generated";
import { getPostsByTagSlug, getPostTagSlugs } from "providers/ContentProvider";

export async function getStaticPaths() {
  let paths = getPostTagSlugs()
    .map((tagSlug: string) => ({ tagSlug, posts: getPostsByTagSlug(tagSlug) }))
    .filter(({ posts }) => posts.length > siteConfig.settings.postsPerPage)
    .map(({ tagSlug, posts }) => {
      let total = Math.ceil(posts.length / siteConfig.settings.postsPerPage);

      return Array.from({ length: total - 1 }).map((_, i) => ({
        params: {
          tagSlug,
          page: (i + 2).toString(),
        },
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
  const tagSlug = params?.tagSlug as string;
  const posts: Post[] = getPostsByTagSlug(tagSlug);
  const page: number = Number(params?.page || "2");
  const pointer: number = (page - 1) * siteConfig.settings.postsPerPage;

  return {
    props: {
      posts: posts.slice(pointer, pointer + siteConfig.settings.postsPerPage),
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

      <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl ck">
        <span className="font-bold text-red-500">/</span>
        tag
        <span className="mx-2 font-bold text-red-500">/</span>
        {tagSlug}
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
