import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function IndexRoute() {
  return (
    <Layout>
      <main className="inset typography mt-20 text-2xl font-light">
        <p>Hello, I'm Shaun 👋</p>
        <p>
          I like{" "}
          <Link href="/apps">
            <a>making things</a>
          </Link>{" "}
          with 🖤 and 💻. Sometimes I{" "}
          <Link href="/music">
            <a>write songs</a>
          </Link>{" "}
          and{" "}
          <Link href="/words">
            <a>words</a>
          </Link>{" "}
          as well.
        </p>
      </main>
    </Layout>
  );
}
