import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { isNumber, isObject } from "util";
import { CalendarService } from "../core/calendar/calendar.service";
import { CalendarFilter } from "../core/models/calendar-filter.interface";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CalendarFilterItem } from "../core/models/calendar-filter-item.interface";
import { FormBuilder, FormGroup } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { FilterService } from "../core/filter/filter.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnChanges {
  @Input()
  public filters: Array<string | number>;

  @Input()
  public calendarId: number;

  public calendarFilters: CalendarFilter[];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public form: FormGroup;

  constructor(
    private calendarService: CalendarService,
    private fb: FormBuilder,
    private filterService: FilterService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filters.currentValue || !changes.calendarId.currentValue) {
      return;
    }

    this.form = this.fb.group({});

    this.loadFilters();
  }

  public displayFn(value: CalendarFilterItem[]): string | null {
    return null;
  }

  public selected(
    event: Event,
    filterItem: CalendarFilterItem,
    filter: CalendarFilter
  ): void {
    event.stopPropagation();
    this.toggleSelection(filterItem, filter);
  }

  public toggleSelection(
    filterItem: CalendarFilterItem,
    filter: CalendarFilter
  ) {
    filterItem.selected = !filterItem.selected;

    if (filterItem.selected) {
      filter.selectedItems.push(filterItem);
    } else {
      const i = filter.selectedItems.findIndex(
        (item: CalendarFilterItem) => item.id === filterItem.id
      );

      filter.selectedItems.splice(i, 1);
    }

    this.filterService.emit(this.getAllSelectedFilters());
  }

  public clearFilters(filter: CalendarFilter): void {
    filter.selectedItems.forEach(
      (item: CalendarFilterItem) => (item.selected = !item.selected)
    );
    filter.selectedItems = [];

    this.filterService.emit(this.getAllSelectedFilters());
  }

  private loadFilters(): void {
    const requests: Observable<CalendarFilter>[] = [];

    this.filters.forEach((filter: string | number) => {
      if (isNumber(filter)) {
        requests.push(
          this.calendarService.getFilters(
            this.calendarId,
            "taxonomy_filter_group_item",
            `taxonomies/${filter.toString()}`
          )
        );
      } else {
        requests.push(
          this.calendarService.getFilters(this.calendarId, filter.toString())
        );
      }
    });

    forkJoin(requests).subscribe((result: CalendarFilter[]) => {
      result.forEach((filter: CalendarFilter) => {
        this.form.addControl(filter.id, this.fb.control(null));
        filter.selectedItems = [];
        filter.filtereditems = this.form.get(filter.id).valueChanges.pipe(
          startWith(null),
          map((query: string | null) =>
            query && !isObject(query)
              ? this.filter(query, filter)
              : filter.items.slice()
          )
        );

        filter.displayFn = this.displayFn;

        if (filter.id === "taxonomy_filter_group_item") {
          filter.display_name = "Source";
        }
      });

      this.calendarFilters = result;
    });
  }

  private getAllSelectedFilters(): CalendarFilterItem[] {
    return this.calendarFilters.map((filter: CalendarFilter) => filter.selectedItems).flat();
  }

  private filter(value: string, filter: CalendarFilter): CalendarFilterItem[] {
    const filterValue = value.toLowerCase();

    return filter.items.filter(
      (item) => item.title.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
