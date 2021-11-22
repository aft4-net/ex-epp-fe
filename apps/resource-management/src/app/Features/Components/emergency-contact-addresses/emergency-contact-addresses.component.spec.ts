import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyContactAddressesComponent } from './emergency-contact-addresses.component';

describe('EmergencyContactAddressesComponent', () => {
  let component: EmergencyContactAddressesComponent;
  let fixture: ComponentFixture<EmergencyContactAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyContactAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyContactAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
