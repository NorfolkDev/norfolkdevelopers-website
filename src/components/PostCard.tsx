import { FrontMatter } from "../lib/blog-engine";
import { dateFormat } from "../lib/date-functions";
import TagList from "../components/TagList";

type Props = {
  post: FrontMatter;
};

export default function PostCard({ post }: Props) {
  return (
    <li className="flex flex-col md:flex-row border-green-300 bg-background-secondary border-l md:rounded mb-6 py-4 px-4">
      <div className="mr-6 w-full mb-4 md:mb-0 md:w-2/12">
        {post.tags && <TagList tags={post.tags} />}
      </div>
      <div className="flex flex-col w-10/12">
        <h2 className="text-2xl tracking-tight">{post.title}</h2>
        {post.date && (
          <span className="inline text-foreground-secondary text-sm font-bold">
            {dateFormat(new Date(post.date))}
          </span>
        )}
        <p className="text-foreground-primary mt-4">{post.excerpt}</p>
      </div>
    </li>
  );
}
