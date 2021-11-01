import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseView } from './base-view';

describe('BaseViewComponent', () => {
  let component: BaseView;
  let fixture: ComponentFixture<BaseView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
