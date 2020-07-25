import { format } from "date-fns";

export function dateFormat(date: Date, useTime: boolean = false) {
  return format(date, `d LLLL yyyy${useTime ? `• h:mmaaaa` : ``}`).replace(
    /\./g,
    ""
  );
}
