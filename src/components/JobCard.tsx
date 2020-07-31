import Link from "next/link";
import { dateFormat } from "src/dateFormat";
import TagList from "src/components/TagList";
import { Job } from "src/pages/jobs";
import { formatDistanceToNow } from "date-fns";

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  return (
    <li className="flex flex-col md:flex-row mb-6 py-4 px-4 hover:border rounded">
      <div className="mr-6 w-full mb-1 md:mt-2 md:mb-0 md:w-2/12">
        {job.tags && <TagList tags={job.tags} />}
      </div>
      <div className="flex flex-col md:w-10/12">
        <span className="text-foreground-secondary text-sm">
          Posted {formatDistanceToNow(new Date(job.date))} ago
        </span>
        {job.date && (
          <span className="text-foreground-secondary text-sm">
            {job.expiryDate ? `Closing date: ${dateFormat(new Date(job.expiryDate))}` : 'This job has no expiry date.'}
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
