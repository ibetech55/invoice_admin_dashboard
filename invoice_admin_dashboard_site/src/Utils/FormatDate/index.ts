import { DateTime } from "luxon";

export const formatDate = (value: string) => {
  return DateTime.fromISO(value, { zone: "utc" }).toFormat("dd/MM/yyyy");
};
