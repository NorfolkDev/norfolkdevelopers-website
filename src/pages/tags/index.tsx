import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { GetStaticProps } from "next";
import PageMeta from "../../components/PageMeta";
import { getPostTagSlugs } from "providers/ContentProvider";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tags: string[] = getPostTagSlugs();

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
  // @TODO: Actually provide a design for this page - appears to have never had one
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
