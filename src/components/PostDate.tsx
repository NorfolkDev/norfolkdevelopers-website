import { differenceInCalendarDays, formatDistance } from "date-fns";
import { dateFormat } from "src/dateFormat";

export interface PostDateProps {
  date: Date;
}

export default function PostDate({ date }: PostDateProps) {
  const daysSincePosted = differenceInCalendarDays(new Date(), date);

  if (daysSincePosted > 7) {
    return <>on {dateFormat(date)}</>
  }

  return <span title={dateFormat(date)}>{formatDistance(date, new Date())} ago</span>
}
