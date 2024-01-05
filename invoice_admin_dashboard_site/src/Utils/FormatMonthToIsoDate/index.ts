import { DateTime } from "luxon";

export const formatMonthToIsoDate = (value:string) => DateTime.fromFormat(value, 'LLL/yyyy', {locale:'en'}).toISODate()?.toString();