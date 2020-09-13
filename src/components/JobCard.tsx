import Link from "next/link";
import { dateFormat } from "src/dateFormat";
import TagList from "src/components/TagList";
import { JobData } from "../DataTypes";
import { formatDistanceToNow } from "date-fns";

type Props = {
  job: JobData;
};

export default function JobCard({ job }: Props) {
  return (
    <li className="flex flex-col md:flex-row mb-6 py-4 px-4 hover:border rounded">

      <div className="flex flex-col md:w-10/12">
        <span className="text-foreground-secondary text-sm">
          Posted {formatDistanceToNow(new Date(job.date))} ago
        </span>
        {job.expiryDate && (
          <span className="text-foreground-secondary text-sm">
            {job.expiryDate ? `Closing date: ${dateFormat(new Date(job.expiryDate))}` : 'This job has no expiry date.'}
          </span>
        )}
        <span className="text-foreground-secondary">
          {job.role} | {job.salary}
        </span>
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
