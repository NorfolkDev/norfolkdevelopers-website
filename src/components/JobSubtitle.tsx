import { JobData } from "src/DataTypes";

type Props = {
    job: JobData
};

export default function JobSubtitle({ job }: Props) {
    return <span className="text-foreground-secondary">
        (
            {job.location}
            {job.salary ? ` / ${job.salary}` : ''}
            {job.seniority ? ` / ${job.seniority}` : ''}
        )
    </span>
}
