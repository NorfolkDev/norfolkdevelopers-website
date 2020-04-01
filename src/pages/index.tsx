import Layout from "../components/layout/Layout";
import Head from "next/head";
import siteConfig from "../../site.config";

export default function IndexRoute() {
  return (
    <Layout>
      <Head>
        <title>{siteConfig.siteName}</title>
      </Head>
      <main className="inset typography mt-20 text-5xl">
        <p className="text-5xl">
          Hello, this is{" "}
          <span className="font-bold">{siteConfig.siteName}</span> 👋
        </p>
      </main>
    </Layout>
  );
}
