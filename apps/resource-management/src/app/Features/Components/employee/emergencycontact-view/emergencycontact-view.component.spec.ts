import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencycontactViewComponent } from './emergencycontact-view.component';

describe('EmergencycontactViewComponent', () => {
  let component: EmergencycontactViewComponent;
  let fixture: ComponentFixture<EmergencycontactViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencycontactViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencycontactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
