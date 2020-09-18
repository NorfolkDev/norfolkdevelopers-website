import siteConfig from "site.config";
import { GetStaticProps } from "next";
import { getTags, getStaticTagPaths } from "@static-fns/blog";
import Layout from "src/components/layout/Layout";
import PostCard from "src/components/PostCard";
import PageMeta from "../../components/PageMeta";
import Pagination from "../../components/Pagination";
import { PostData } from "src/DataTypes";

export async function getStaticPaths() {
  if (!siteConfig.features.tagPages) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths: getStaticTagPaths(),
    fallback: false,
  };
}

type Props = {
  posts: PostData[];
  page: number;
  total: number;
  tagSlug: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tagSlug = params?.tagSlug as string;
  const posts = getTags();
  const tagPosts = posts[tagSlug];

  return {
    props: {
      page: 1,
      posts: tagPosts.slice(0, siteConfig.settings.postsPerPage),
      total: tagPosts.length,
      tagSlug
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
            <PostCard key={post.path} post={post} />
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
