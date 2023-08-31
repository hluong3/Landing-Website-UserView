import { EventInput, EventApi } from "@fullcalendar/angular";
import { IEvent } from "src/app/models/event";
let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: TODAY_STR,
    color: "#ff0000", // red
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: TODAY_STR + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
export const transferDay = (day: string) =>
  new Date(day).toISOString().replace(/T.*$/, "");
export const transferEventApi = (raw: IEvent): EventInput => ({
  id: raw.id,
  title: raw.title,
  start: raw.startTime,
  end: raw.endTime,
  color: raw.calendarCategoryId?.color,
  extendedProps: { description: raw.description },
});
export const transferListEventApi = (raw: IEvent[]): EventInput[] =>
  raw.map((raw) => transferEventApi(raw));
export const sortListByDate = (array: IEvent[], field: string, type: string) =>
  field === "start"
    ? type === "asc"
      ? array.sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
      : array.sort((a, b) => (a.startTime < b.startTime ? 1 : -1))
    : type === "asc"
    ? array.sort((a, b) => (a.endTime > b.endTime ? 1 : -1))
    : array.sort((a, b) => (a.endTime < b.endTime ? 1 : -1));
