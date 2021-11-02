import { Observable } from 'rxjs';
import { CalendarFilterItem } from './calendar-filter-item.interface';

export interface CalendarFilter {
  id: string;
  display_name: string;
  items: CalendarFilterItem[];
  filtereditems: Observable<CalendarFilterItem[]>;
  selectedItems: CalendarFilterItem[];
  displayFn: Function;
}
