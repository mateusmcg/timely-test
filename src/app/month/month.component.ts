import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  constructor(private calendarService: CalendarService, private filterService: FilterService) { }

  public ngOnInit(): void {
  }

}
