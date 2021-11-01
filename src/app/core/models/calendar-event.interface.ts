import * as moment from "moment";
import { CalendarEventImage } from "./calendar-event-image.interface";

export interface CalendarEvent {
  id: number;
  title: string;
  description_short: string;
  start_datetime: moment.Moment;
  end_datetime: moment.Moment;
  event_status: string;
  instance: number;
  images: CalendarEventImage[];
  taxonomies: { [prop: string ]: []};
}
