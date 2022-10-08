import Layout from "src/components/layout/Layout";
import Head from "next/head";
import siteConfig from "site.config";
import { getPosts } from "@static-fns/blog";
import { JobData } from "src/DataTypes";
import JobCard from "src/components/JobCard";
import getConfig from "next/config";
// const { serverRuntimeConfig } = getConfig();
import { isAfter as isAfterDate } from "date-fns";

export async function getStaticProps() {
  // let directory = `${serverRuntimeConfig.PROJECT_ROOT}/pages/jobs`;

  return {
    props: { jobs: [] },
    // props: { jobs: JSON.parse(JSON.stringify(getPosts({ directory }))) },
  };
}

type Props = {
  jobs: [];
};

export default function JobsRoute({ jobs }: Props) {
  return (
    <div>
      <p>Broken</p>
    </div>
  );
  // const activeJobs = jobs.filter(
  //   (job) => job.expiryDate && isAfterDate(new Date(job.expiryDate), new Date())
  // );

  // return (
  //   <Layout location="jobs">
  //     <Head>
  //       <title>
  //         {siteConfig.siteName}/{siteConfig.jobsDirectory}
  //       </title>
  //     </Head>
  //     <section className="section" id="posts">
  //       <h1 className="pb-4 mt-8 ml-auto mr-auto text-3xl font-bold lg:max-w-3xl">
  //         <span className="font-bold text-red-500">/</span>
  //         {siteConfig.jobsDirectory}
  //       </h1>
  //       <main className="block mt-4 border-gray-600 important:mr-auto important:ml-auto">
  //         {activeJobs.length === 0 ? (
  //           <h2>There doesn't seem to be anything here.</h2>
  //         ) : (
  //           <ul className="-mx-4">
  //             {activeJobs.map((post) => (
  //               <JobCard key={post.path} job={post} />
  //             ))}
  //           </ul>
  //         )}
  //       </main>
  //     </section>
  //   </Layout>
  // );
}
