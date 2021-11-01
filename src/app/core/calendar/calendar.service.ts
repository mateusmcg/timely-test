import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from '../models/calendar-event.interface';
import { CalendarSettings } from '../models/calendar-settings.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class CalendarService {
  private readonly

  constructor(private http: HttpClient) { }

  public getSettings(): Observable<CalendarSettings> {
    const settingsUrl = `${environment.apiUrl}/api/calendars/info`;

    return this.http.post<{ data: CalendarSettings }>(settingsUrl, { url: 'https://calendar.time.ly/6a37fb6n' }).pipe(
      map((settings: { data: CalendarSettings }) => settings.data)
    );
  }

  public getEvents(calendarId: number): Observable<CalendarEvent[]> {
    const eventsUrl = `${environment.apiUrl}/api/calendars/${calendarId}/events`;

    return this.http.get<CalendarEvent[]>(eventsUrl);
  }
}
