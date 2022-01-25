import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettimesheetComponent } from './settimesheet.component';

describe('SettimesheetComponent', () => {
  let component: SettimesheetComponent;
  let fixture: ComponentFixture<SettimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
