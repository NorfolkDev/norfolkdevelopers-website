import { formatDistanceToNow } from "date-fns";
import { dateFormat } from "src/dateFormat";
import { JobData } from "../DataTypes";

type Props = {
  job: JobData;
};

export default function JobDetails({ job }: Props) {
  return (
    <ol className="mt-2 text-foreground-secondary text-sm md:flex md:m-0">
      <li className="mb-2 md:mb-0 md:mr-2">
        <label className="mr-2" role="img" aria-label="calendar" alt="Published at">📅</label>
        {formatDistanceToNow(new Date(job.date))} ago
      </li>
      <li className="mb-2 md:mb-0 md:mr-2">
        <label className="mr-2" role="img" aria-label="stopwatch" alt="Expiration date">⏱️</label>
        {job.expiryDate ? `${dateFormat(new Date(job.expiryDate))}` : 'No expiry date.'}
      </li>
      <li className="mb-2 md:mb-0 md:mr-2">
        <label className="mr-2" role="img" aria-label="briefcase" alt="Job Role">💼</label>
        {job.role}
      </li>
      <li className="mb-2 md:mb-0 md:mr-2">
        <label className="mr-2" role="img" aria-label="purse" alt="Salary">👛</label>
        {job.salary}
      </li>
    </ol>
  );
}