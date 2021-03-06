import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';
import { CalendarEvent } from '../core/models/calendar-event.interface';
import { BaseView } from '../shared/base-view/base-view';

@Component({
  selector: 'app-posterboard',
  templateUrl: './posterboard.component.html',
  styleUrls: ['./posterboard.component.scss'],
})
export class PosterboardComponent extends BaseView {
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
      .getEvents(this.calendarId, this.startDate)
      .subscribe((events: CalendarEvent[]) => {
        this.events = events;
        this.filteredEvents = events;

        this.filterService.emitLastValue();
      });
  }
}
