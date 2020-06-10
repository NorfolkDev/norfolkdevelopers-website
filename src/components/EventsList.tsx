import useSWR from "swr";
import { fetcher } from "@static-fns/blog";
import { format } from "date-fns";

export default function EventsList() {
  const { data, error } = useSWR<MeetupEvent[]>(
    "https://cors-it-is.shaun.now.sh/?url=https://api.meetup.com/Norfolk-Developers-NorDev/events?&sign=true&photo-host=public&page=1&limit=10",
    fetcher
  );
  if (error) return <div>Error loading events from meetup.com 🙁</div>;
  if (!data)
    return (
      <div>
        Loading events from{" "}
        <a
          className="text-href-base hover:text-href-hover"
          href="https://www.meetup.com/Norfolk-Developers-NorDev/events/"
        >
          https://www.meetup.com
        </a>
        ...
      </div>
    );

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.slice(0, 9).map((event) => (
        <li
          key={event.id}
          className="block bg-background-secondary rounded leading-tight tracking-tight"
        >
          <a href={event.link} className="p-4 block hover:outline">
            <h3 className="font-bold text-lg">📆 {event.name} </h3>
            <p className="text-foreground-secondary mt-2 font-bold">
              {format(new Date(event.time), "eeee, do LLL, yyyy ")}
            </p>
            <p className="mt-1 text-foreground-secondary">
              {format(new Date(event.time), "HH:mm")} to{" "}
              {format(new Date(event.time + event.duration), "HH:mm")}
            </p>
            <p className="text-href-base mt-1 font-bold">RSVP &raquo;</p>
            <p className="text-sm mt-1 text-foreground-tertiary">
              {event.yes_rsvp_count}
              {event.rsvp_limit
                ? ` / ${event.rsvp_limit}`
                : null} attending{" "}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}

type MeetupEvent = {
  created: number;
  date_in_series_pattern: boolean;
  description: string;
  duration: number; // milis?
  group: any; // meetup group object
  how_to_find_us: string;
  id: string;
  is_online_event: boolean;
  link: string;
  local_date: string;
  local_time: string;
  member_pay_fee: boolean;
  name: string;
  rsvp_limit: number;
  status: string;
  time: number;
  updated: number;
  utc_offset: number;
  venue: {
    id: number;
    name: string;
    repinned: boolean;
  };
  visibility: string;
  waitlist_count: number;
  yes_rsvp_count: number;
};
