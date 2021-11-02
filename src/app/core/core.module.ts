import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarService } from './calendar/calendar.service';

import { MAT_DATE_FORMATS } from '@angular/material';

import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from '../header/header.module';
import { HeaderComponent } from '../header/header.component';
import { FilterModule } from '../filter/filter.module';
import { FilterComponent } from '../filter/filter.component';
import { FilterService } from './filter/filter.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    // Core Modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // 3rd Party
    MatMomentDateModule,
    // App Modules
    HeaderModule,
    FilterModule
  ],
  providers: [
    CalendarService,
    FilterService,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [HeaderComponent, FilterComponent, CommonModule],
})
export class CoreModule {}
