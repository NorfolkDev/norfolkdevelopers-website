import Link from "next/link";
import Layout from "../../components/layout/Layout";

export async function getStaticProps() {
  const { getPosts } = require("../../lib/blog-engine");
  return { props: { posts: getPosts() } };
}

export default function WordsRoute({ posts }) {
  return (
    <Layout location="words">
      <h1 className="inset mt-8 text-3xl font-extrabold pb-4 lg:max-w-3xl mr-auto ml-auto">
        /words
      </h1>
      <main className="inset mt-4 border-gray-600 important:mr-auto important:ml-auto block">
        <ul>
          {posts.map(post => (
            <li key={post.path} className="mb-4">
              <span className="block text-base text-gray-500">{post.date}</span>
              <Link href={post.path || "/"}>
                <a className="text-2xl font-semibold text-blue-700 hover:text-blue-400">
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
