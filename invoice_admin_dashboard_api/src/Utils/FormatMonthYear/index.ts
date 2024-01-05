import { DateTime } from "luxon";

export const formatMonthYear = (value: Date) =>
  DateTime.fromJSDate(value, { zone: "utc" })
    .toFormat("MMM/yyyy", { locale: "pt-BR" })
    .replace(".", "")
    .toUpperCase();
