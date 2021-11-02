import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';
import { CalendarEventGroup } from '../core/models/calendar-event-group.interface';
import { CalendarEvent } from '../core/models/calendar-event.interface';
import { BaseView } from '../shared/base-view/base-view';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent extends BaseView {

  constructor(
    protected calendarService: CalendarService,
    protected filterService: FilterService,
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog
  ) {
    super(calendarService, filterService, activatedRoute, dialog);
  }

  protected loadEvents(): void {
    this.calendarService
      .getEventsGroup(this.calendarId, this.startDate)
      .subscribe((events: CalendarEventGroup[]) => {
        this.groupEvents = events;

        this.filterService.emitLastValue();
      });
  }

}
