import Link from "next/link";
import Layout from "../../components/layout/Layout";

function WordsRoute({ posts }) {
  return (
    <Layout>
      <h1 className="inset mt-8 text-4xl font-extrabold ">/words [index]</h1>
      <main className="inset mt-4">
        <ul>
          {posts.map(post => (
            <li key={post.path} className="mb-4">
              <span className="block text-base text-gray-500">{post.date}</span>
              <Link href={post.path || "/"}>
                <a className="text-blue-700 hover:text-blue-400">
                  {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { getPosts } = require("../../lib/get-posts");
  return { props: { posts: getPosts() } };
}

export default WordsRoute;
