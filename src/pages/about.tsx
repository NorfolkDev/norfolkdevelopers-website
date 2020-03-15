import Layout from "../components/layout/Layout";

export default function AboutRoute() {
  return (
    <Layout>
      <h1 className="inset mt-20 text-4xl font-extrabold mb-8">About</h1>
      <main className="inset typography">
        <p>
          All the details. All the details. All the details. All the details.
          All the details.{" "}
        </p>
        <p>On twitter</p>
      </main>
    </Layout>
  );
}
