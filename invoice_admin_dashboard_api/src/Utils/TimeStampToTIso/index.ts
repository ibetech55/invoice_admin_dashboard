import { DateTime } from "luxon"

export const timestampToIso = (value: Date) => {
    return DateTime.fromJSDate(value).toISO().split('.')[0]
}