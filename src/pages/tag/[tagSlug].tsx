import siteConfig from "site.config";
import { GetStaticProps } from "next";
import Layout from "src/components/layout/Layout";
import PostCard from "src/components/PostCard";
import PageMeta from "../../components/PageMeta";
import Pagination from "../../components/Pagination";
import { Post } from "contentlayer/generated";
import { getPostsByTag, getPostTags } from "providers/ContentProvider";

export async function getStaticPaths() {
  let paths = getPostTags().map((tagSlug) => ({
    params: {
      tagSlug,
    },
  }));

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
  const posts = getPostsByTag(tagSlug);

  return {
    props: {
      page: 1,
      posts: posts.slice(0, siteConfig.settings.postsPerPage),
      total: posts.length,
      tagSlug,
    },
  };
};

export default function TagSlug({ posts, page, total, tagSlug }: Props) {
  return (
    <Layout location="words">
      <PageMeta title={`Posts Tagged: ${tagSlug}`} />

      <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl ck">
        <span className="font-bold text-red-500">/</span>
        tag
        <span className="font-bold text-red-500">/</span>
        {tagSlug}
      </h1>

      <main className="block mt-4 border-gray-600 important:mr-auto important:ml-auto">
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
