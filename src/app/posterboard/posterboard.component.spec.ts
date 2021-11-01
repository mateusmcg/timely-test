import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterboardComponent } from './posterboard.component';

describe('PosterboardComponent', () => {
  let component: PosterboardComponent;
  let fixture: ComponentFixture<PosterboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosterboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
