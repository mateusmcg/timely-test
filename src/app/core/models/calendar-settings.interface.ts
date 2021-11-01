export interface CalendarSettings {
  id: number;
  title: string;
  calendar_filters: string[];
  default_view: string;
  show_filters: boolean;
  enabled_agenda: boolean;
  enabled_month: boolean;
  enabled_posterboard: boolean;
  enabled_stream: boolean;
  enabled_tile: boolean;
  enabled_week: boolean;
}
