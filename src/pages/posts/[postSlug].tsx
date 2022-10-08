import siteConfig from "site.config";
import { GetStaticProps } from "next";
import Layout from "src/components/layout/Layout";
import PageMeta from "../../components/PageMeta";
import Pagination from "../../components/Pagination";
import { allPosts, Post } from "contentlayer/generated";

// @TODO: allPosts.find() can return null, but, we won't be passed null because we've mapped over existing posts - Fix this?
type Props = {
  post: Post | null;
};

export async function getStaticPaths() {
  return {
    paths: allPosts.map((post: Post) => ({
      params: { postSlug: post.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postSlug = params?.postSlug as string;
  const post: Post | null =
    allPosts.find((post) => post.slug === postSlug) ?? null;

  return {
    props: {
      post,
    },
  };
};

export default function PostSlug({ post }: Props) {
  return post ? (
    <div>
      <p>{post.title}</p>
    </div>
  ) : (
    <div>
      <p>404 - Post not found</p>
    </div>
  );
}

// export default function TagSlug({ post }: Props) {
//   return (
//     <Layout location="words">
//       <PageMeta title={`Posts Tagged: ${tagSlug}`} />

//       <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl ck">
//         <span className="font-bold text-red-500">/</span>
//         tag
//         <span className="font-bold text-red-500">/</span>
//         {tagSlug}
//       </h1>
//       <main className="block mt-4 border-gray-600 important:mr-auto important:ml-auto">
//         <ul className="-mx-4">
//           {posts.map((post) => (
//             <PostCard key={post.url} post={post} />
//           ))}
//         </ul>

//         <Pagination
//           root="/tag"
//           seperator={`${tagSlug}/p`}
//           page={page}
//           total={total}
//           perPage={siteConfig.settings.postsPerPage}
//         />
//       </main>
//     </Layout>
//   );
// }
