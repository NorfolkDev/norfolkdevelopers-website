import Link from "next/link";
import { PostData } from "@static-fns/blog";
import { dateFormat } from "src/dateFormat";
import TagList from "src/components/TagList";

type Props = {
  job: PostData;
};

export default function JobCard({ job }: Props) {
  return (
    <li className="flex flex-col md:flex-row mb-6 py-4 px-4 hover:border rounded">
      <div className="mr-6 w-full mb-1 md:mt-2 md:mb-0 md:w-2/12">
        {job.tags && <TagList tags={job.tags} />}
      </div>
      <div className="flex flex-col md:w-10/12">
        {job.date && (
          <span className="text-foreground-secondary text-sm">
            Closing date: {dateFormat(new Date(job.date))}
          </span>
        )}
        <Link href={job.path || ""}>
          <a>
            <h2 className="text-2xl text-foreground-primary font-bold tracking-tight hover:text-red-500">
              {job.title}
            </h2>
          </a>
        </Link>
        <p className="text-foreground-secondary text-lg mt-2">{job.excerpt}</p>
      </div>
    </li>
  );
}
