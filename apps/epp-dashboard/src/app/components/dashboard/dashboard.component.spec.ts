import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:apps/epp-dashboard/src/app/components/dashboard/dashboard.component.spec.ts
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
=======
import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserComponent ]
>>>>>>> origin:apps/usermanagement/src/app/features/components/user/add-user/add-user.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:apps/epp-dashboard/src/app/components/dashboard/dashboard.component.spec.ts
    fixture = TestBed.createComponent(DashboardComponent);
=======
    fixture = TestBed.createComponent(AddUserComponent);
>>>>>>> origin:apps/usermanagement/src/app/features/components/user/add-user/add-user.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
