import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  ActivatedRoute,
  NavigationExtras,
  ParamMap,
  Params,
  Route,
  Router,
  UrlSegment,
} from "@angular/router";
import * as moment from "moment";
import { CalendarSettings } from "src/app/core/models/calendar-settings.interface";
import { environment } from "src/environments/environment";
import { CalendarService } from "../core/calendar/calendar.service";
import { DATE_FORMATS } from "../core/enum/date-formats.enum";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public calendarSettings: CalendarSettings;

  public selectedView: string;
  public date: FormControl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private calendarService: CalendarService
  ) {
    this.date = new FormControl();
  }

  public ngOnInit(): void {
    this.loadCalendarSettings();
  }

  public loadDefault(): void {
    this.navigateToCalendar(environment.defaultView, { queryParamsHandling: "" });
  }

  public loadToday(): void {
    const params: NavigationExtras = {
      queryParams: {
        startDate: moment().format(DATE_FORMATS.MM_DD_YYYY),
      },
    };

    this.navigateToCalendar(this.selectedView, params);
  }

  public changeView(selectedView: string): void {
    this.selectedView = selectedView;
    this.navigateToCalendar(this.selectedView);
  }

  private loadCalendarSettings(): void {
    this.calendarService
      .getSettings()
      .subscribe((settings: CalendarSettings) => {
        this.calendarSettings = settings;

        this.listenToRouteChanges();
        this.listenToDateChanges();
      });
  }

  private listenToRouteChanges(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const startDate = params.has("startDate")
        ? moment(params.get("startDate"))
        : moment();
      this.date.patchValue(startDate);

      const segments: string[] = this.router.url.split("?")[0].split("/");
      this.selectedView =
        segments && segments.length === 4
          ? segments[3]
          : environment.defaultView;

      if (this.router.url === "/") {
        this.loadDefault();
      }
    });
  }

  private listenToDateChanges(): void {
    this.date.valueChanges.subscribe((date: moment.Moment) => {
      if (!date.isValid()) {
        return;
      }

      const params: NavigationExtras = {
        queryParams: {
          startDate: date.format(DATE_FORMATS.MM_DD_YYYY),
        },
        queryParamsHandling: "merge",
      };

      this.navigateToCalendar(this.selectedView, params);
    });
  }

  private navigateToCalendar(
    view: string,
    params: NavigationExtras = { queryParamsHandling: "merge" }
  ): void {
    this.router.navigate(["calendar", this.calendarSettings.id, view], params);
  }
}
