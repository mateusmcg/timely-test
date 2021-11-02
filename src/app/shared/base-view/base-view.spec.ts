import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarService } from 'src/app/core/calendar/calendar.service';
import { FilterService } from 'src/app/core/filter/filter.service';
import { Mocks } from 'src/testing/mocks.enum';

import { BaseView } from './base-view';

@Component({
  template: '',
})
class MockedComponent extends BaseView {
  constructor(
    protected calendarService: CalendarService,
    protected filterService: FilterService,
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog
  ) {
    super(calendarService, filterService, activatedRoute, dialog);
  }

  protected loadEvents(): void {}
}

describe('BaseViewComponent', () => {
  let component: MockedComponent;
  let fixture: ComponentFixture<MockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [MockedComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CalendarService, useValue: Mocks.CALENDAR_SERVICE },
        { provide: FilterService, useValue: Mocks.FILTER_SERVICE },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
