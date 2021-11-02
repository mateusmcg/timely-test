import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent } from 'src/app/core/models/calendar-event.interface';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public event: CalendarEvent) { }
}
