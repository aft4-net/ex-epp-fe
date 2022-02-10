import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyStationComponent } from './duty-station.component';

describe('DutyStationComponent', () => {
  let component: DutyStationComponent;
  let fixture: ComponentFixture<DutyStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
