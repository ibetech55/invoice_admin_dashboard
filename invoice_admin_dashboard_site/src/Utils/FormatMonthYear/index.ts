import { DateTime } from "luxon";

export const formatMonthYear = (value: string) =>
  DateTime.fromJSDate(new Date(value), { zone: "utc" })
    .toFormat("MMM/yyyy", { locale: "pt-BR" })
    .replace(".", "")
    .toUpperCase();
