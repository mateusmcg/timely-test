import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  ActivatedRoute,
  NavigationExtras,
  ParamMap,
  Router,
} from "@angular/router";
import * as moment from "moment";
import { CalendarSettings } from "src/app/core/models/calendar-settings.interface";
import { DATE_FORMATS } from "../core/enum/date-formats.enum";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnChanges {
  @Input()
  public calendarSettings: CalendarSettings;

  public selectedView: string;
  public date: FormControl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.date = new FormControl();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.calendarSettings.isFirstChange()) {
      return;
    }

    this.listenToRouteChanges();
    this.listenToDateChanges();
  }

  public loadToday(view: string): void {
    const params: NavigationExtras = {
      queryParams: {
        startDate: moment().format(DATE_FORMATS.MM_DD_YYYY),
      },
    };

    this.navigateToCalendar(view, params);
  }

  public changeView(selectedView: string): void {
    this.selectedView = selectedView;
    this.navigateToCalendar(this.selectedView);
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
          : this.calendarSettings.default_view;

      if (this.router.url === "/") {
        this.loadToday(this.calendarSettings.default_view);
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
