import * as moment from 'moment';
import { CalendarEvent } from './calendar-event.interface';

export interface CalendarEventGroup {
  date: moment.Moment;
  events: CalendarEvent[];
  filteredEvents: CalendarEvent[];
}
