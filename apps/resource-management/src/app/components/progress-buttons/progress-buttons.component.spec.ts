import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressButtonsComponent } from './progress-buttons.component';

describe('ProgressButtonsComponent', () => {
  let component: ProgressButtonsComponent;
  let fixture: ComponentFixture<ProgressButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
