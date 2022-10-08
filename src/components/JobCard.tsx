import { Job } from "contentlayer/generated";
import Link from "next/link";
import JobDetails from "src/components/JobDetails";
import JobSubtitle from "src/components/JobSubtitle";

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  return (
    <li className="mb-6 py-4 px-4">
      <div className="md:w-10/12">
        <Link href={job.url || ""}>
          <a>
            <h2 className="text-2xl text-foreground-primary font-bold tracking-tight hover:text-red-500">
              {job.title}&nbsp;
              <JobSubtitle job={job} />
            </h2>
          </a>
        </Link>

        <JobDetails job={job} />

        {/* @TODO: Add excerpt as a computed field */}
        {/* <p className="mt-2 text-lg text-foreground-secondary">{job.excerpt}</p> */}
      </div>
    </li>
  );
}
