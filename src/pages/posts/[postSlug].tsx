import siteConfig from "site.config";
import { GetStaticProps } from "next";
import Layout from "src/components/layout/Layout";
import PageMeta from "../../components/PageMeta";
import Pagination from "../../components/Pagination";
import { allPosts, Post } from "contentlayer/generated";
import TagList from "src/components/TagList";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { slugify } from "src/slugify";
import PostDate from "src/components/PostDate";
import { useMDXComponent } from "next-contentlayer/hooks";
// import NorDevCon from "../../components/layout/NorDevCon";

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

// @TODO: Load MDX Components, for Posts
// const mdxComponents = {
//   NorDevCon,
// };

export default function PostSlug({ post }: Props) {
  if (!post) {
    // User should never see this route, post will never be null.
    return (
      <div>
        <p>404 - Post not found</p>
      </div>
    );
  }

  const MDXContent = useMDXComponent(post.body.code);
  const router = useRouter();
  // @TODO: Refactor into a computed field
  let editUrl = `${siteConfig.githubUrl}edit/master/src/pages/${router.pathname}/index.mdx`;

  return (
    <Layout>
      <PageMeta
        title={post.title}
        image={post.hero ? `${siteConfig.rootUrl}${post.hero}` : undefined}
        description={post.excerpt}
      />

      <article className="mt-8 ml-auto mr-auto article lg:max-w-3xl">
        <header className="mb-12 inset">
          <TagList tags={post.tagList} />

          <h1 className="mt-2 mb-1 text-4xl font-bold leading-tight hashtag md:text-5xl">
            {post.title}
          </h1>
          {post.author ?? (
            <span className="block text-base text-gray-600">
              by{" "}
              {post.authors.map((author: string, i: number) => (
                <Fragment key={author}>
                  <Link
                    href="/author/[authorSlug]"
                    as={`/author/${slugify(author)}`}
                  >
                    <a className="underline">{author}</a>
                  </Link>
                  {i < post.author.length - 1 ? ", " : ""}
                </Fragment>
              ))}
              {post.date && (
                <>
                  {" "}
                  <PostDate date={new Date(post.date)} />
                </>
              )}
            </span>
          )}
          {post.hero && <img className="mt-12 mb-12" src={post.hero} />}
        </header>
        <div className="typography">
          <MDXContent />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
        <footer className="py-4 mt-6 text-base">
          <a
            className="text-foreground-secondary hover:text-foreground-primary hover:underline"
            href={editUrl}
            target="_blank"
            rel="nofollow"
          >
            Edit this post on GitHub
          </a>
        </footer>
      </article>
    </Layout>
  );
}
