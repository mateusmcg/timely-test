import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { Mocks } from "src/testing/mocks.enum";
import { CalendarService } from "../core/calendar/calendar.service";
import { FilterService } from "../core/filter/filter.service";

import { StreamComponent } from "./stream.component";

describe("StreamComponent", () => {
  let component: StreamComponent;
  let fixture: ComponentFixture<StreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [StreamComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CalendarService, useValue: Mocks.CALENDAR_SERVICE },
        { provide: FilterService, useValue: Mocks.FILTER_SERVICE },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
