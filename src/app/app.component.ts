import { Component, OnInit } from "@angular/core";
import { CalendarService } from "./core/calendar/calendar.service";
import { CalendarSettings } from "./core/models/calendar-settings.interface";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public calendarSettings: CalendarSettings;

  constructor(private calendarService: CalendarService) {}

  public ngOnInit(): void {
    this.loadCalendarSettings();
  }

  private loadCalendarSettings(): void {
    this.calendarService
      .getSettings()
      .subscribe((settings: CalendarSettings) => {
        this.calendarSettings = settings;
      });
  }
}
