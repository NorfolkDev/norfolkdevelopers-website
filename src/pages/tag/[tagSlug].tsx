export default function TagSlug({ posts }) {
  return (
    <div>
      Tagslug
      {posts.map(post => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const { getTags } = require("../../lib/get-posts");

  return {
    paths: Object.keys(getTags()).map(tag => {
      return { params: { tagSlug: tag } };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { getTags } = require("../../lib/get-posts");
  const posts = getTags()[params.tagSlug];
  return {
    props: {
      posts
    }
  };
}
