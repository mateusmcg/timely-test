import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';
import { CalendarEventGroup } from '../core/models/calendar-event-group.interface';
import { BaseView } from '../shared/base-view/base-view';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent extends BaseView {
  constructor(
    protected calendarService: CalendarService,
    protected filterService: FilterService,
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog
  ) {
    super(calendarService, filterService, activatedRoute, dialog);
  }

  protected loadEvents(): void {
    const weekStart = this.startDate.startOf("week").clone();
    const weekEnd = this.startDate.endOf("week").clone();

    this.calendarService
      .getEventsGroup(this.calendarId, weekStart, weekEnd, 600)
      .subscribe((events: CalendarEventGroup[]) => {
        this.groupEvents = events;
        this.filterService.emitLastValue();
      });
  }
}
