export interface CalendarEventImage {
  sizes: ImageSizes;
}

export interface ImageSizes {
  full: ImageSettings;
  medium: ImageSettings;
  small: ImageSettings;
  thumbnail: ImageSettings;
}

export interface ImageSettings {
  width: number;
  height: number;
  url: string;
}
