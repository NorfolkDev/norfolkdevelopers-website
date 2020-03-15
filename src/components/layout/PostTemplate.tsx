import Layout from "./Layout";

export default function PostTemplate({ frontMatter, children }) {
  return (
    <Layout>
      <article className="mt-20 lg:max-w-3xl mr-auto ml-auto">
        {frontMatter.date && (
          <span className="inset inline-block text-gray-600">
            {frontMatter.date}
          </span>
        )}
        <h1 className="inset text-5xl font-bold leading-tight mb-4">
          {frontMatter.title}
        </h1>

        <main className="typography inset mt-8">{children}</main>
      </article>
    </Layout>
  );
}
