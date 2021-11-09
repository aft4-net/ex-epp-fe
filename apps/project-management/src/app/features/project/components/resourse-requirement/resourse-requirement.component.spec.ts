import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourseRequirementComponent } from './resourse-requirement.component';

describe('ResourseRequirementComponent', () => {
  let component: ResourseRequirementComponent;
  let fixture: ComponentFixture<ResourseRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourseRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourseRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
