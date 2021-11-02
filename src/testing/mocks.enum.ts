import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

export enum Mocks {
  CALENDAR_SERVICE = jasmine.createSpyObj('CalendarService', { 'getSettings': of(), 'getEvents': of(), 'getEventsGroup': of(), 'getFilters': of()}),
  FILTER_SERVICE = jasmine.createSpyObj('FilterService', {'emit': null, 'emitLastValue': null, 'listen': of()}),
  ACTIVATED_ROUTE = {
    queryParamMap: of({}),
    snapshot: { data: { }, paramMap: { get: () => 5 }, queryParamMap: { has: () => true, get: () => {} } }
  } as any,
}
