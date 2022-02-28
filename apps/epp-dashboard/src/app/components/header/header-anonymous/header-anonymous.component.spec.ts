import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAnonymousComponent } from './header-anonymous.component';

describe('HeaderAnonymousComponent', () => {
  let component: HeaderAnonymousComponent;
  let fixture: ComponentFixture<HeaderAnonymousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAnonymousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
