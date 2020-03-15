import Link from "next/link";
import Layout from "../../components/layout/Layout";

function WordsRoute({ posts }) {
  return (
    <Layout>
      <h1 className="text-4xl font-extrabold">/words [index]</h1>
      <p className="text-gray-500 text-base mt-4">Wednesday 27 March 2020</p>
      <Link href="/words/test-slug">
        <a>Test Post</a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const { getPosts } = require("../../lib/get-posts");
  return { props: { posts: getPosts() } };
}

export default WordsRoute;
