import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailViewComponent } from './family-detail-view.component';

describe('FamilyDetailViewComponent', () => {
  let component: FamilyDetailViewComponent;
  let fixture: ComponentFixture<FamilyDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
