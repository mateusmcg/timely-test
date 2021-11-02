import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { Mocks } from 'src/testing/mocks.enum';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let calendarService: CalendarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [FilterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CalendarService, useValue: Mocks.CALENDAR_SERVICE },
        FormBuilder,
        { provide: FilterService, useValue: Mocks.FILTER_SERVICE },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    calendarService = TestBed.get(CalendarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayFn should return null', () => {
    expect(component.displayFn()).toBeNull();
  });

  describe('ngOnChanges', () => {
    it('getFilters should not be called', () => {
      component.ngOnChanges({
        filters: { currentValue: null } as SimpleChange,
        calendarId: { currentValue: null } as SimpleChange,
      });

      expect(component.form).toBeUndefined();
    });

    it('getFilters should be called 3 times', () => {
      component.filters = ['test', 'test-2', 'test-3'];
      component.calendarId = 1;

      component.ngOnChanges({
        filters: {
          currentValue: ['test', 'test-2', 'test-3'],
        } as SimpleChange,
        calendarId: {
          currentValue: 1,
        } as SimpleChange,
      } as SimpleChanges);

      expect(calendarService.getFilters).toHaveBeenCalledTimes(3);
    });
  });
});
