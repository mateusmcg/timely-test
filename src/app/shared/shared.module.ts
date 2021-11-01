import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  entryComponents: [EventDetailsComponent],
  declarations: [EventDetailsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [EventDetailsComponent]
})
export class SharedModule { }
