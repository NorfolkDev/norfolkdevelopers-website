import Layout from "src/components/layout/Layout";
import Head from "next/head";
import siteConfig from "site.config";
import JobCard from "src/components/JobCard";
import { Job } from "contentlayer/generated";
import { GetStaticProps } from "next";
import Pagination from "src/components/Pagination";
import { getJobs } from "providers/ContentProvider";

type Props = {
  jobs: Job[];
  page: number;
  total: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const Jobs = getJobs();

  return {
    props: {
      page: 1,
      jobs: Jobs,
      total: Jobs.length,
    },
  };
};

export default function JobsRoute({ jobs, page, total }: Props) {
  return (
    <Layout location="jobs">
      <Head>
        <title>
          {siteConfig.siteName}/{siteConfig.jobsDirectory}
        </title>
      </Head>
      <section className="section" id="posts">
        <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl">
          <span className="font-bold text-red-500">/</span>
          {siteConfig.jobsDirectory}
        </h1>
        <main className="block mt-4 border-gray-600 important:mr-auto important:ml-auto">
          {jobs.length === 0 ? (
            <h2>There doesn't seem to be anything here.</h2>
          ) : (
            <>
              <ul className="-mx-4">
                {jobs.map((job) => (
                  <JobCard key={job.url} job={job} />
                ))}
              </ul>

              <Pagination
                root="/jobs"
                seperator="p"
                page={page}
                total={total}
                perPage={siteConfig.settings.postsPerPage}
              />
            </>
          )}
        </main>
      </section>
    </Layout>
  );
}
