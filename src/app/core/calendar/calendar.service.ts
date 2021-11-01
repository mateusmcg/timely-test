import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { CalendarEvent } from "../models/calendar-event.interface";
import { CalendarSettings } from "../models/calendar-settings.interface";
import { environment } from "../../../environments/environment";
import { CalendarFilter } from "../models/calendar-filter.interface";
import { CalendarFilterItem } from "../models/calendar-filter-item.interface";
import * as moment from "moment";
import { DATE_FORMATS } from "../enum/date-formats.enum";

@Injectable()
export class CalendarService {
  private readonly;

  constructor(private http: HttpClient) {}

  public getSettings(): Observable<CalendarSettings> {
    const settingsUrl = `${environment.apiUrl}/api/calendars/info`;

    return this.http
      .post<{ data: CalendarSettings }>(settingsUrl, {
        url: "https://calendar.time.ly/6a37fb6n",
      })
      .pipe(map((settings: { data: CalendarSettings }) => settings.data));
  }

  public getEvents(
    calendarId: number,
    startDate: moment.Moment,
    perPage: number = 50,
    page: number = 1,
    groupByDate: boolean = false
  ): Observable<CalendarEvent[]> {
    const eventsUrl = `${environment.apiUrl}/api/calendars/${calendarId}/events`;

    const params: HttpParams = new HttpParams()
      .set("start_date", startDate.format(DATE_FORMATS.YYYY_MM_DD))
      .set("per_page", perPage.toString())
      .set("page", page.toString())
      .set("group_by_date", groupByDate ? "1" : "0");

    return this.http.get<{ data: { items: CalendarEvent[] } }>(eventsUrl, { params }).pipe(
      map((events: { data: { items: CalendarEvent[] } }) => events.data.items)
    );
  }

  public getFilters(
    calendarId: number,
    type: string,
    path: string = "taxonomies"
  ): Observable<CalendarFilter> {
    const eventsUrl = `${environment.apiUrl}/api/calendars/${calendarId}/${path}`;

    const params: HttpParams = new HttpParams()
      .set("per_page", "1000")
      .set("type", type)
      .set("page", "1");

    return this.http
      .get<{ data: { display_name: string; items: CalendarFilterItem[] } }>(
        eventsUrl,
        { params }
      )
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
