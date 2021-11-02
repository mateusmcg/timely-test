import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Mocks } from 'src/testing/mocks.enum';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';

import { WeekComponent } from './week.component';

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [WeekComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CalendarService, useValue: Mocks.CALENDAR_SERVICE },
        { provide: FilterService, useValue: Mocks.FILTER_SERVICE },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
