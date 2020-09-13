import Layout from "./Layout";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import siteConfig from "site.config";
import TagList from "src/components/TagList";
import { slugify } from "src/slugify";
import PageMeta from "../PageMeta";
import { formatDistanceToNow } from "date-fns";
import { dateFormat } from "src/dateFormat";

type Props = {
  frontMatter: any;
  children?: any;
};

export default function PostTemplate({ frontMatter: post, children }: Props) {
  const router = useRouter();
  let editUrl = `${siteConfig.githubUrl}edit/master/src/pages/${router.pathname}/index.mdx`

  return (
    <Layout>
      <PageMeta
        title={post.title}
        image={post.hero ? `${siteConfig.rootUrl}${post.hero}` : undefined}
        description={post.excerpt}
      />

      <article className="article mt-8 lg:max-w-3xl mr-auto ml-auto">
        <header className="inset mb-12">
          <h1 className="hashtag mt-2 mb-1 text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          <p className="my-2 text-lg font-bold">Closing {dateFormat(new Date(post.expiryDate))}</p>

          <ul className="my-2">
            <li>
              <label className="font-bold text-foreground-primary">Role:&nbsp;</label>
              {post.role}
            </li>
            <li>
              <label className="font-bold text-foreground-primary">Salary:&nbsp;</label>
              {post.salary}
            </li>
            {post.company &&
              <li>
                <label className="font-bold text-foreground-primary">Company:&nbsp;</label>
                {post.company}
              </li>
            }
            {post.location &&
              <li>
                <label className="font-bold text-foreground-primary">Location:&nbsp;</label>
                {post.location}
              </li>
            }
            {post.seniority &&
              <li>
                <label className="font-bold text-foreground-primary">Seniority:&nbsp;</label>
                {post.seniority}
              </li>
            }
          </ul>

          {post.apply &&
            <a href={post.apply} className="block md:inline-block p-4 text-xl white bg-orange-600 border-orange-900">
              Apply Now
            </a>
          }

          {post.hero && <img className="mt-12 mb-12" src={post.hero} />}
        </header>
        <div className="typography">{children}</div>
        <footer className="mt-6 py-4 text-base">
          <a className="text-foreground-secondary hover:text-foreground-primary hover:underline" href={editUrl} target="_blank" rel="nofollow">
            Edit this post on GitHub
          </a>
        </footer>
      </article>
    </Layout>
  );
}
