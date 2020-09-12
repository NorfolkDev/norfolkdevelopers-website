import Link from "next/link";
import { dateFormat } from "src/dateFormat";
import TagList from "src/components/TagList";
import { PostData } from "src/PostData";

type Props = {
  post: PostData;
};

export default function PostCard({ post }: Props) {
  return (
    <li className="flex flex-col md:flex-row mb-6 py-4 px-4 hover:border rounded">
      <div className="mr-6 w-full mb-1 md:mt-2 md:mb-0 md:w-2/12">
        {post.tags && <TagList tags={post.tags} />}
      </div>
      <div className="flex flex-col md:w-10/12">
        {post.date && (
          <span className="text-foreground-secondary text-sm">
            {dateFormat(new Date(post.date))}
          </span>
        )}
        <Link href={post.path || ""}>
          <a>
            <h2 className="text-2xl text-foreground-primary font-bold tracking-tight hover:text-red-500">
              {post.title}
            </h2>
          </a>
        </Link>
        <p className="text-foreground-secondary text-lg mt-2">{post.excerpt}</p>
      </div>
    </li>
  );
}
