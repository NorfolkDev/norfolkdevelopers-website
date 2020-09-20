import { useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import siteConfig from "site.config";
import { getAuthors } from "@static-fns/blog";
import { PostData } from "src/DataTypes";
import Layout from "./Layout";
import PageMeta from "../PageMeta";
import PostCard from "src/components/PostCard";

type AuthorTemplateProps = {
  frontMatter: any;
  children?: any;
};

export default function AuthorTemplate({ frontMatter: post, children }: AuthorTemplateProps) {
  const router = useRouter();

  let editUrl = `${siteConfig.githubUrl}edit/master/src/pages${router.pathname}/index.mdx`
  let title = `Posts by: ${post.title}`;

  // ARGH! This works during build, because it's at static buildtime?
  // It doesn't working during dev because it's trying to use getAuthors
  // in the browser(?). I can't use getStaticProps to inject this in AFAIK(?)
  // So, this is gonna need some thinking ...
  let posts = getAuthors()[post.slug];

  return (
    <Layout>
      <PageMeta title={title} />

      <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
        {title}
      </h1>
      <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <div className="typography">{children}</div>

        <ol className="-mx-4">
          {posts.map((post: PostData) => (
            <PostCard key={post.path} post={post} />
          ))}
        </ol>
      </main>
    </Layout>
  );
}
