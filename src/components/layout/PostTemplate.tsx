import Layout from "./Layout";

export default function PostTemplate({ frontMatter, children }) {
  return (
    <Layout>
      <article className="p-2">
        <h1 className="text-5xl font-bold">{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
        <main>{children}</main>
      </article>
    </Layout>
  );
}
