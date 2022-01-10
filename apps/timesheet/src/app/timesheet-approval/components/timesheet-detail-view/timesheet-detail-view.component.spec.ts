import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDetailViewComponent } from './timesheet-detail-view.component';

describe('TimesheetDetailViewComponent', () => {
  let component: TimesheetDetailViewComponent;
  let fixture: ComponentFixture<TimesheetDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
