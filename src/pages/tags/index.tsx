import Link from "next/link";
import Layout from "../../components/layout/Layout";

export default function TagsRoute({ tags }) {
  return (
    <Layout>
      <h1 className="inset">Tags</h1>
      <main className="inset">
        {tags.map(tag => (
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

export async function getStaticProps({ params }) {
  const { getTags } = require("../../lib/get-posts");
  const tags = Object.keys(getTags());

  return {
    props: {
      tags
    }
  };
}
