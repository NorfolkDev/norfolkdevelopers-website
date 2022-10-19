import Link from "next/link";
import { dateFormat } from "src/dateFormat";
import TagList from "src/components/TagList";
import { Post } from "contentlayer/generated";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <li className="flex flex-col px-4 py-4 mb-6 rounded md:flex-row">
      <div className="w-full mb-1 mr-6 md:mt-2 md:mb-0 md:w-2/12">
        {post.tagList && <TagList tags={post.tagList} />}
      </div>
      <div className="flex flex-col md:w-10/12">
        {post.date && (
          <span className="text-sm text-foreground-secondary">
            {dateFormat(new Date(post.date))}
          </span>
        )}
        <Link href={post.url || ""}>
          <a>
            <h2 className="text-2xl font-bold tracking-tight text-foreground-primary hover:text-red-500">
              {post.title}
            </h2>
          </a>
        </Link>
        <p className="mt-2 text-lg text-foreground-secondary">{post.excerpt}</p>
      </div>
    </li>
  );
}
