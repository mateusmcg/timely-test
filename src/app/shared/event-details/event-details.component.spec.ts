import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material';
import { By } from '@angular/platform-browser';
import { CalendarEvent } from 'src/app/core/models/calendar-event.interface';

import { EventDetailsComponent } from './event-details.component';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'test title',
            id: 1,
            description_short: 'description short',
          } as CalendarEvent,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud render title', () => {
    const h2: DebugElement = fixture.debugElement.query(By.css('h2'));
    expect(h2).toBeDefined();
    expect(h2.nativeElement.innerHTML).toEqual('test title');
  });

  it('shoud render short description', () => {
    const p: DebugElement = fixture.debugElement.query(By.css('p'));
    expect(p).toBeDefined();
    expect(p.nativeElement.innerHTML.trim()).toEqual('description short');
  });
});
