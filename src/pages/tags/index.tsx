import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { GetStaticProps } from "next";
import { getTags } from "src/lib/blog/blog-fns";
import PageMeta from "../../components/PageMeta";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tags = Object.keys(getTags());
  return {
    props: {
      tags,
    },
  };
};

type Props = {
  tags: string[];
};

export default function TagsRoute({ tags }: Props) {
  return (
    <Layout>
      <PageMeta title="Tags" />

      <h1 className="inset">Tags</h1>
      <main className="inset">
        {tags.map((tag) => (
          <Link href={`/tag/${tag}`} key={tag}>
            <a>
              <span>{tag + " "}</span>
            </a>
          </Link>
        ))}
      </main>
    </Layout>
  );
}
