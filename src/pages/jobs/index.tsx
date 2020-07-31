import Layout from "src/components/layout/Layout";
import Head from "next/head";
import siteConfig from "site.config";
import { getPosts, PostData } from "@static-fns/blog";
import JobCard from "src/components/JobCard";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export async function getStaticProps() {
  return { props: { posts: JSON.parse(JSON.stringify(
      // TODO: Filter archived
      getPosts({ directory: `${serverRuntimeConfig.PROJECT_ROOT}/pages/jobs` })
    )) } };
}

type Props = {
  posts: PostData[];
};

export default function JobsRoute({ posts }: Props) {
  return (
    <Layout location="jobs">
      <Head>
        <title>
          {siteConfig.siteName}/{siteConfig.jobsDirectory}
        </title>
      </Head>
      <section className="section" id="posts">
        <h1 className="mt-8 text-3xl font-bold pb-4 lg:max-w-3xl mr-auto ml-auto">
          <span className="text-red-500 font-bold">/</span>
          {siteConfig.jobsDirectory}
        </h1>
        <main className="mt-4 border-gray-600 important:mr-auto important:ml-auto block">
          {posts.length === 0 && <h2>There doesn't seem to be anything here.</h2>}
          <ul className="-mx-4">
            {posts.map((post) => (
              <JobCard key={post.path} job={post} />
            ))}
          </ul>
        </main>
      </section>
    </Layout>
  );
}
