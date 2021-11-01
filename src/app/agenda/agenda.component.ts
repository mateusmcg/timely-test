import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';
import { CalendarEventGroup } from '../core/models/calendar-event-group.interface';
import { BaseView } from '../shared/base-view/base-view';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent extends BaseView {

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
