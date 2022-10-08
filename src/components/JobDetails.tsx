import { Job } from "contentlayer/generated";
import { formatDistanceToNow } from "date-fns";
import { dateFormat } from "src/dateFormat";

type Props = {
  job: Job;
};

export default function JobDetails({ job }: Props) {
  return (
    <ol className="mt-2 text-sm text-foreground-secondary md:flex md:m-0">
      <li className="mb-2 md:mb-0 md:mr-2">
        <span className="mr-2" role="img" aria-label="Published at">
          📅
        </span>
        {formatDistanceToNow(new Date(job.date))} ago
      </li>
      <li className="mb-2 md:mb-0 md:mr-2">
        <span className="mr-2" role="img" aria-label="Expiration date">
          ⏱️
        </span>
        {job.expiryDate
          ? `${dateFormat(new Date(job.expiryDate))}`
          : "No expiry date."}
      </li>
      <li className="mb-2 md:mb-0 md:mr-2">
        <span className="mr-2" role="img" aria-label="Job Role">
          💼
        </span>
        {job.role}
      </li>
    </ol>
  );
}
