import Layout from "./Layout";
import { useRouter } from "next/router";
import siteConfig from "site.config";
import JobDetails from "src/components/JobDetails";
import PageMeta from "src/components/PageMeta";
import JobSubtitle from "src/components/JobSubtitle";

type Props = {
  frontMatter: any;
  children?: any;
};

export default function JobTemplate({ frontMatter: post, children }: Props) {
  const router = useRouter();
  let editUrl = `${siteConfig.githubUrl}edit/master/src/pages${router.pathname}/index.mdx`;

  return (
    <Layout>
      <PageMeta
        title={post.title}
        image={post.hero ? `${siteConfig.rootUrl}${post.hero}` : undefined}
        // @TODO: Add excerpt as a computed field
        // description={post.excerpt}
      />

      <article className="article mt-8 lg:max-w-3xl mr-auto ml-auto">
        <header className="inset mb-12">
          <h1 className="hashtag mb-4 text-4xl md:text-5xl font-bold leading-tight">
            {post.title}&nbsp;
            <JobSubtitle job={post} />
          </h1>

          <JobDetails job={post} />

          {post.apply &&
            <a
              href={post.apply}
              className="block md:inline-block mt-4 p-4 text-xl white bg-orange-600 border-orange-900 rounded"
            >
              Apply Now
            </a>
          }

          {post.hero && <img className="my-12" src={post.hero} />}
        </header>
        <div className="typography">{children}</div>
        <footer className="mt-6 py-4 text-base">
          <a
            className="text-foreground-secondary hover:text-foreground-primary hover:underline"
            href={editUrl}
            target="_blank"
            rel="nofollow"
          >
            Edit this job on GitHub
          </a>
        </footer>
      </article>
    </Layout>
  );
}
