import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  constructor(private calendarService: CalendarService, private filterService: FilterService) { }

  public ngOnInit(): void {
  }

}
