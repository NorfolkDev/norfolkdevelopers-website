import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import generate from "../../lib/build-rss";
// const generate = require("../lib/build-rss");

const TOOLS = ["rss"];

export const getStaticPaths: GetStaticPaths = async () => {
  generate("./public");
  return {
    paths: [{ params: { toolName: "rss" } }, { params: { toolName: "feed" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      posts: TOOLS,
    },
  };
};

export default function RSS() {
  const router = useRouter();
  const { toolName } = router.query;

  return <div>TOOL PAGE: {toolName}</div>;
}
