import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingAddressComponent } from './operating-address.component';

describe('OperatingAddressComponent', () => {
  let component: OperatingAddressComponent;
  let fixture: ComponentFixture<OperatingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
