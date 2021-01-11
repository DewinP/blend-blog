import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

export const sinceDate = (date: string) => {
  if (typeof date === "undefined") {
    return "sometime ago";
  }

  return dayjs(date).fromNow().toString();
};

export const normalFormat = (date: string) => {
  let newDate = dayjs(parseInt(date)).format("MMM DD, YYYY");
  return newDate.toString();
};
