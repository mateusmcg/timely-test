import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {

  constructor(private calendarService: CalendarService, private filterService: FilterService) { }

  public ngOnInit(): void {
  }

}
