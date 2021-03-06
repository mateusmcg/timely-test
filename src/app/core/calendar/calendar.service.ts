import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from '../models/calendar-event.interface';
import { CalendarSettings } from '../models/calendar-settings.interface';
import { environment } from '../../../environments/environment';
import { CalendarFilter } from '../models/calendar-filter.interface';
import { CalendarFilterItem } from '../models/calendar-filter-item.interface';
import * as moment from 'moment';
import { DATE_FORMATS } from '../enum/date-formats.enum';
import { CalendarEventGroup } from '../models/calendar-event-group.interface';

@Injectable()
export class CalendarService {
  constructor(private http: HttpClient) {}

  public getSettings(): Observable<CalendarSettings> {
    const settingsUrl = `${environment.apiUrl}/api/calendars/info`;

    return this.http
      .post<{ data: CalendarSettings }>(settingsUrl, {
        url: 'https://calendar.time.ly/6a37fb6n',
      })
      .pipe(map((settings: { data: CalendarSettings }) => settings.data));
  }

  public getEvents(
    calendarId: number,
    startDate: moment.Moment,
    perPage: number = 50,
    page: number = 1
  ): Observable<CalendarEvent[]> {
    const eventsUrl = `${environment.apiUrl}/api/calendars/${calendarId}/events`;

    const params: HttpParams = new HttpParams()
      .set('start_date', startDate.format(DATE_FORMATS.YYYY_MM_DD))
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    return this.http
      .get<{ data: { items: CalendarEvent[] } }>(eventsUrl, { params })
      .pipe(
        map((events: { data: { items: CalendarEvent[] } }) => events.data.items)
      );
  }

  public getEventsGroup(
    calendarId: number,
    startDate: moment.Moment,
    endDate: moment.Moment = null,
    perPage: number = 50,
    page: number = 1
  ): Observable<CalendarEventGroup[]> {
    const eventsUrl = `${environment.apiUrl}/api/calendars/${calendarId}/events`;

    let params: HttpParams = new HttpParams()
      .set('start_date', startDate.format(DATE_FORMATS.YYYY_MM_DD))
      .set('per_page', perPage.toString())
      .set('page', page.toString())
      .set('group_by_date', '1');

    if (endDate) {
      params = params.set('end_date', endDate.format(DATE_FORMATS.YYYY_MM_DD));
      params = params.set('lastDate', null);
    }

    return this.http
      .get<{ data: { items: { [prop: string]: CalendarEvent[] } } }>(
        eventsUrl,
        { params }
      )
      .pipe(
        map(
          (events: {
            data: { items: { [prop: string]: CalendarEvent[] } };
          }) => {
            const groupEvents: CalendarEventGroup[] = [];

            Object.keys(events.data.items).forEach((group: string) => {
              groupEvents.push({
                date: moment(group),
                events: events.data.items[group],
                filteredEvents: events.data.items[group],
              });
            });

            return groupEvents;
          }
        )
      );
  }

  public getFilters(
    calendarId: number,
    type: string,
    path: string = 'taxonomies'
  ): Observable<CalendarFilter> {
    const eventsUrl = `${environment.apiUrl}/api/calendars/${calendarId}/${path}`;

    const params: HttpParams = new HttpParams()
      .set('per_page', '1000')
      .set('type', type)
      .set('page', '1');

    return this.http
      .get<{
        data: {
          query_name: string;
          display_name: string;
          items: CalendarFilterItem[];
        };
      }>(eventsUrl, { params })
      .pipe(
        map(
          (filters: {
            data: {
              query_name: string;
              display_name: string;
              items: CalendarFilterItem[];
            };
          }) => {
            return {
              id: filters.data.query_name,
              items: filters.data.items,
              display_name: filters.data.display_name,
            } as CalendarFilter;
          }
        )
      );
  }
}
