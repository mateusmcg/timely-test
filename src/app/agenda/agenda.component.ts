import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../core/calendar/calendar.service';
import { FilterService } from '../core/filter/filter.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  constructor(private calendarService: CalendarService, private filterService: FilterService) { }

  public ngOnInit(): void {
  }

}
