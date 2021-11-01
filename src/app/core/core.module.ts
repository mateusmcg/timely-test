import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { CalendarService } from "./calendar/calendar.service";

import { MAT_DATE_FORMATS } from "@angular/material";

import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import { UIStateService } from "./ui-state/ui-state.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderModule } from "../header/header.module";
import { HeaderComponent } from "../header/header.component";

export const MY_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "LL",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatMomentDateModule,
    HeaderModule
  ],
  providers: [
    CalendarService,
    UIStateService,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
