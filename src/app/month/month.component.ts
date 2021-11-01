import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { CalendarService } from "../core/calendar/calendar.service";
import { FilterService } from "../core/filter/filter.service";
import { CalendarEventGroup } from "../core/models/calendar-event-group.interface";
import { BaseView } from "../shared/base-view/base-view";

@Component({
  selector: "app-month",
  templateUrl: "./month.component.html",
  styleUrls: ["./month.component.scss"],
})
export class MonthComponent extends BaseView {
  constructor(
    protected calendarService: CalendarService,
    protected filterService: FilterService,
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog
  ) {
    super(calendarService, filterService, activatedRoute, dialog);
  }

  protected loadEvents(): void {
    const monthStart = this.startDate.startOf("month").clone();
    const monthEnd = this.startDate.endOf("month").clone();

    this.calendarService
      .getEventsGroup(this.calendarId, monthStart, monthEnd, 600)
      .subscribe((events: CalendarEventGroup[]) => {
        this.groupEvents = events;
        this.filterService.emitLastValue();
      });
  }
}
