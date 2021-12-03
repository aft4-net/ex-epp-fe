import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceDetailComponent } from './add-device-detail.component';

describe('AddDeviceDetailComponent', () => {
  let component: AddDeviceDetailComponent;
  let fixture: ComponentFixture<AddDeviceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
