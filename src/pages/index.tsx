import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function IndexRoute() {
  return (
    <Layout>
      <main className="inset typography mt-20 text-5xl">
        <p className="text-5xl">
          Hello, I'm <span className="font-bold">Shaun</span> 👋
        </p>
        <p className="text-3xl">
          I mostly{" "}
          <Link href="/apps">
            <a>
              <span className="text-blue-600">make things</span>
            </a>
          </Link>{" "}
          with 🖤 and 💻. Sometimes I{" "}
          <Link href="/music">
            <a>
              <span className="text-red-600">write songs</span>
            </a>
          </Link>{" "}
          and{" "}
          <Link href="/words">
            <a>
              <span className="text-green-600">words</span>
            </a>
          </Link>{" "}
          as well.
        </p>
        <p className="text-2xl text-gray-500"></p>
        <p className="text-2xl text-gray-500">
          Come at me on twitter{" "}
          <a href="https://twitter.com/shaunchurch">@shaunchurch</a>.
        </p>
      </main>
    </Layout>
  );
}
