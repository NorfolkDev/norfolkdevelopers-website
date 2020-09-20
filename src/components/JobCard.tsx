import Link from "next/link";
import { JobData } from "src/DataTypes";
import JobDetails from "src/components/JobDetails";
import JobSubtitle from "src/components/JobSubtitle";

type Props = {
  job: JobData;
};

export default function JobCard({ job }: Props) {
  return (
    <li className="mb-6 py-4 px-4">
      <div className="md:w-10/12">
        <Link href={job.path || ""}>
          <a>
            <h2 className="text-2xl text-foreground-primary font-bold tracking-tight hover:text-red-500">
              {job.title}&nbsp;
              <JobSubtitle job={job} />
            </h2>
          </a>
        </Link>

        <JobDetails job={job} />

        <p className="text-foreground-secondary text-lg mt-2">{job.excerpt}</p>
      </div>
    </li>
  );
}
