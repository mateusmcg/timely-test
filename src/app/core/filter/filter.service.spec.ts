import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { CalendarFilterItem } from "../models/calendar-filter-item.interface";
import { CalendarFilter } from "../models/calendar-filter.interface";

import { FilterService } from "./filter.service";

describe("FilterService", () => {
  let service: FilterService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FilterService],
    })
  );

  beforeEach(() => {
    service = TestBed.get(FilterService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should listen and emit filters", () => {
    service.emit([{ id: 123 }, { id: 987 }] as CalendarFilterItem[]);

    service.listen().subscribe((filters: CalendarFilterItem[]) => {
      expect(filters).toEqual([
        { id: 123 },
        { id: 987 },
      ] as CalendarFilterItem[]);
    });
  });

  it("should listen last emitted value", () => {
    service.emit([{ id: 555 }] as CalendarFilterItem[]);

    service.listen().subscribe((filters: CalendarFilterItem[]) => {
      expect(filters).toEqual([{ id: 555 }] as CalendarFilterItem[]);
    });

    service.emitLastValue();
  });
});
