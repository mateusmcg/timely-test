import { OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as moment from "moment";
import { CalendarService } from "src/app/core/calendar/calendar.service";
import { FilterService } from "src/app/core/filter/filter.service";
import { CalendarEvent } from "src/app/core/models/calendar-event.interface";
import { CalendarFilterItem } from "src/app/core/models/calendar-filter-item.interface";
import { EventDetailsComponent } from "../event-details/event-details.component";

export abstract class BaseView implements OnInit {
  protected calendarId: number;
  protected startDate: moment.Moment;

  public events: CalendarEvent[];
  public filteredEvents: CalendarEvent[];

  constructor(
    protected calendarService: CalendarService,
    protected filterService: FilterService,
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.loadCalendarId();
    this.loadParams();
    this.listenToFilters();
  }

  public openDetails(event: CalendarEvent): void {
    let dialogRef = this.dialog.open(EventDetailsComponent, {
      data: event
    });
  }

  protected abstract loadEvents(): void;

  private loadCalendarId(): void {
    this.calendarId = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get("id")
    );
  }

  private loadParams(): void {
    const queryParamMap: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    this.startDate = queryParamMap.has("startDate") ? moment(queryParamMap.get("startDate")) : moment();

    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.startDate = params.has("startDate") ? moment(params.get("startDate")) : moment();
      this.events = [];
      this.filteredEvents = [];
      this.loadEvents();
    });
  }

  private listenToFilters(): void {
    this.filterService.listen().subscribe((filters: CalendarFilterItem[]) => {
      const filterIds: number[] = filters.map((filter: CalendarFilterItem) => filter.id);

      this.filteredEvents = filterIds.length === 0 ? this.events : this.events.filter((event: CalendarEvent) => {
        const allTaxonomy: string[] = event.taxonomies ? Object.keys(event.taxonomies) : [];
        let eventFilters: number[] = [];

        allTaxonomy.forEach((taxonomy: string) => {
          eventFilters = eventFilters.concat(event.taxonomies[taxonomy].map((eventFilter: CalendarFilterItem) => eventFilter.id))
        });

        return filterIds.some((filterId: number) => eventFilters.includes(filterId));
      })
    });
  }
}
