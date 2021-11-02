import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  TestRequest,
  HttpTestingController,
} from "@angular/common/http/testing";

import { CalendarService } from "./calendar.service";
import { environment } from "src/environments/environment";
import { CalendarSettings } from "../models/calendar-settings.interface";
import * as moment from "moment";
import { HttpParams } from "@angular/common/http";
import { DATE_FORMATS } from "../enum/date-formats.enum";
import { CalendarEvent } from "../models/calendar-event.interface";
import { CalendarEventGroup } from "../models/calendar-event-group.interface";
import { CalendarFilter } from "../models/calendar-filter.interface";
import { CalendarFilterItem } from "../models/calendar-filter-item.interface";

describe("CalendarService", () => {
  let service: CalendarService;
  let httpTestingController: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendarService],
    })
  );

  beforeEach(() => {
    service = TestBed.get(CalendarService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getSettings", () => {
    it("should make a http request with the correct url and parameters", () => {
      let httpTestRequest: TestRequest;

      service.getSettings().toPromise();

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/info`
      );
      httpTestRequest.flush([]);

      expect(httpTestRequest.request.method).toEqual("POST");
      expect(httpTestRequest.request.body).toEqual({
        url: "https://calendar.time.ly/6a37fb6n",
      });
      expect(httpTestRequest.request.url).toEqual(
        `${environment.apiUrl}/api/calendars/info`
      );
    });

    it("should make a http request and return the data", (done: Function) => {
      let httpTestRequest: TestRequest;
      const calendarSettings: CalendarSettings = {
        id: 1,
        title: "My Calendar",
      } as CalendarSettings;

      const requestResponse: { data: CalendarSettings } = {
        data: calendarSettings,
      };

      service.getSettings().subscribe((settings: CalendarSettings) => {
        expect(settings).toEqual(calendarSettings);

        done();
      });

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/info`
      );
      httpTestRequest.flush(requestResponse);
    });
  });

  describe("getEvents", () => {
    it("should make a http request with the correct url and parameters", () => {
      let httpTestRequest: TestRequest;

      const calendarId: number = 1;
      const now = moment();
      const nowFormat = now.format(DATE_FORMATS.YYYY_MM_DD);

      service.getEvents(calendarId, now).toPromise();

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/${calendarId}/events?start_date=${nowFormat}&per_page=50&page=1`
      );

      httpTestRequest.flush({ data: { items: [] } });

      const params: HttpParams = new HttpParams()
        .set("start_date", nowFormat)
        .set("per_page", "50")
        .set("page", "1");

      expect(httpTestRequest.request.method).toEqual("GET");
      expect(httpTestRequest.request.params.toString()).toEqual(
        params.toString()
      );
      expect(httpTestRequest.request.url).toEqual(
        `${environment.apiUrl}/api/calendars/${calendarId}/events`
      );
    });

    it("should make a http request and return the data", (done: Function) => {
      let httpTestRequest: TestRequest;

      const calendarId: number = 1;
      const now = moment();
      const nowFormat = now.format(DATE_FORMATS.YYYY_MM_DD);

      service
        .getEvents(calendarId, now)
        .subscribe((events: CalendarEvent[]) => {
          expect(events).toEqual([{ id: 1 }, { id: 2 }] as CalendarEvent[]);
          done();
        });

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/${calendarId}/events?start_date=${nowFormat}&per_page=50&page=1`
      );

      httpTestRequest.flush({
        data: { items: [{ id: 1 }, { id: 2 }] as CalendarEvent[] },
      });
    });
  });

  describe("getEventsGroup", () => {
    it("should make a http request with the correct url and parameters", () => {
      let httpTestRequest: TestRequest;

      const calendarId: number = 1;
      const now = moment();
      const nowFormat = now.format(DATE_FORMATS.YYYY_MM_DD);

      service.getEventsGroup(calendarId, now, now).toPromise();

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/${calendarId}/events?start_date=${nowFormat}&per_page=50&page=1&group_by_date=1&end_date=${nowFormat}&lastDate=null`
      );

      httpTestRequest.flush({ data: { items: [] } });

      const params: HttpParams = new HttpParams()
        .set("start_date", nowFormat)
        .set("per_page", "50")
        .set("page", "1")
        .set("group_by_date", "1")
        .set("end_date", nowFormat)
        .set("lastDate", null);

      expect(httpTestRequest.request.method).toEqual("GET");
      expect(httpTestRequest.request.params.toString()).toEqual(
        params.toString()
      );
      expect(httpTestRequest.request.url).toEqual(
        `${environment.apiUrl}/api/calendars/${calendarId}/events`
      );
    });

    it("should make a http request and return the data", (done: Function) => {
      let httpTestRequest: TestRequest;

      const calendarId: number = 1;
      const now = moment();
      const nowFormat = now.format(DATE_FORMATS.YYYY_MM_DD);

      service
        .getEventsGroup(calendarId, now)
        .subscribe((events: CalendarEventGroup[]) => {
          expect(events).toEqual([
            {
              date: moment("2021-11-01"),
              events: [{ id: 1 }, { id: 2 }] as CalendarEvent[],
              filteredEvents: [{ id: 1 }, { id: 2 }] as CalendarEvent[],
            },
            {
              date: moment("2021-12-05"),
              events: [{ id: 7 }, { id: 8 }] as CalendarEvent[],
              filteredEvents: [{ id: 7 }, { id: 8 }] as CalendarEvent[],
            },
          ] as CalendarEventGroup[]);
          done();
        });

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/${calendarId}/events?start_date=${nowFormat}&per_page=50&page=1&group_by_date=1`
      );

      httpTestRequest.flush({
        data: {
          items: {
            "2021-11-01": [{ id: 1 }, { id: 2 }] as CalendarEvent[],
            "2021-12-05": [{ id: 7 }, { id: 8 }] as CalendarEvent[],
          },
        },
      });
    });
  });

  describe("getFilters", () => {
    it("should make a http request with the correct url and parameters", () => {
      let httpTestRequest: TestRequest;

      const calendarId: number = 1;
      const type: string = "type-test";

      service.getFilters(calendarId, type).toPromise();

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/${calendarId}/taxonomies?per_page=1000&type=${type}&page=1`
      );

      httpTestRequest.flush({ data: { items: [] } });

      const params: HttpParams = new HttpParams()
        .set("per_page", "1000")
        .set("type", type)
        .set("page", "1");

      expect(httpTestRequest.request.method).toEqual("GET");
      expect(httpTestRequest.request.params.toString()).toEqual(
        params.toString()
      );
      expect(httpTestRequest.request.url).toEqual(
        `${environment.apiUrl}/api/calendars/${calendarId}/taxonomies`
      );
    });

    it("should make a http request and return the data", (done: Function) => {
      let httpTestRequest: TestRequest;

      const calendarId: number = 1;
      const type: string = "type-test";

      service
        .getFilters(calendarId, type)
        .subscribe((filters: CalendarFilter) => {
          expect(filters).toEqual({
            id: "query",
            display_name: "test",
            items: [{ id: 1 }, { id: 2 }] as CalendarFilterItem[],
          } as CalendarFilter);
          done();
        });

      httpTestRequest = httpTestingController.expectOne(
        `${environment.apiUrl}/api/calendars/${calendarId}/taxonomies?per_page=1000&type=${type}&page=1`
      );

      httpTestRequest.flush({
        data: {
          query_name: "query",
          display_name: "test",
          items: [{ id: 1 }, { id: 2 }] as CalendarFilterItem[],
        },
      });
    });
  });
});
