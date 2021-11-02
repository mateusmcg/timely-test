import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarFilterItem } from '../models/calendar-filter-item.interface';

@Injectable()
export class FilterService {
  private subject: BehaviorSubject<CalendarFilterItem[]>;

  constructor() {
    this.subject = new BehaviorSubject([]);
   }

   public emit(filters: CalendarFilterItem[]): void {
     this.subject.next(filters);
   }

   public emitLastValue(): void {
     this.subject.next(this.subject.getValue());
   }

   public listen(): Observable<CalendarFilterItem[]> {
     return this.subject;
   }
}
