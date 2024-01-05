import { DateTime } from "luxon"

export const formatToIsoDate = (value: Date) => {
    return DateTime.fromJSDate(value, {zone: 'utc'}).toISODate()
}