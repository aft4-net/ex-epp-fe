import { NzTabPosition } from 'ng-zorro-antd/tabs';
import {
  Component,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import {
  Client,
  ClientService,
  Employee,
  EmployeeService,
  Project,
  ProjectCreate,
  ProjectDetail,
  projectResourceType,
  ProjectService,
  ProjectStatus,
  ProjectStatusService,
  AddProjectStateService,
  EditProjectStateService,
  ProjectEdit,
  ProjectResourceStateService,
} from '../../../../core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'exec-epp-Add-Project',
  templateUrl: './Add-Project.component.html',
  styleUrls: ['./Add-Project.component.css'],
})
export class AddProjectComponent implements OnInit, OnDestroy {
  position: NzTabPosition = 'left';
  projectStatus!: boolean;
  selectedStatus!: string;
  typeSelected?: string;
  currentNameSubject$ = new BehaviorSubject('');
  typed!: string;
  projectTypeSelected = this.currentNameSubject$.getValue();

  validateForm!: FormGroup;
  userSubmitted!: boolean;
  currentDate = Date.now.toString();
  projectCreate: ProjectDetail = {} as ProjectDetail;
  clients = [] as Client[];
  employees = [] as Employee[];
  projects = [] as Project[];
  projectStatuses = [] as ProjectStatus[];
  projectNameExits = false;
  enableAddResourceTab = false;
  projectNameExitsErrorMessage = '';
  projectStartdDate = {} as Date;
  disallowResource = true;
  addResourcePermission = false;
  createPermisson = false;
  isSpinning = false;
  disabled = true;
  isOnEditstate = false;
  projectUpdate: ProjectEdit = {} as ProjectEdit;
  projectOld: ProjectEdit = {} as ProjectEdit;
  projectEditStateData!: Project;
  modifiedforUpdate = false;
  enableUpdateButton = false;
  updateValueSeted = false;
  cancelModal = false;
  activeTabIndex = 0;
  saveUpdateload=false;
  resources: projectResourceType[] = [] as projectResourceType[];
  private projectEditDiffer!: KeyValueDiffer<string, any>;

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  @ViewChild('startDatePicker') startDatepicker!: NzDatePickerComponent;

  constructor(
    private  notification: NzNotificationService,
    private projectResourceStateService: ProjectResourceStateService,
    private differs: KeyValueDiffers,
    private projectCreateState: AddProjectStateService,
    private editProjectStateService: EditProjectStateService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private modalService: NzModalService,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private projectStatusService: ProjectStatusService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.projectCreateState.restAddProjectDetails();
    this.editProjectStateService.restUpdateProjectState();
  }

  ngOnInit(): void {
    this.isOnEditstate = this.editProjectStateService.isOnEditstate;
    this.isSpinning = true;
    this.createRegistrationForm();
    this.apiCalls();
    this.projectMapper();
    this.typeChanged();
    this.validateParojectNameWithClient();

    if (
      '/projectmanagement/edit-project' === this.router.url &&
      !this.isOnEditstate
    )
      this.router.navigateByUrl('projectmanagement');
    if (this.isOnEditstate) this.setValueForUpdate();
  }

  setValueForUpdate() {
    this.projectEditStateData = this.editProjectStateService.projectEditData;
    this.validateForm.controls.projectName.setValue(
      this.editProjectStateService.projectEditData.ProjectName
    );
    this.validateForm.controls.supervisor.setValue(
      this.editProjectStateService.projectEditData.SupervisorGuid
    );
    this.validateForm.controls.projectType.setValue(
      this.editProjectStateService.projectEditData.ProjectType
    );
    this.validateForm.controls.status.setValue(
      this.editProjectStateService.projectEditData.ProjectStatus?.Guid
    );
    this.validateForm.controls.client.setValue(
      this.editProjectStateService.projectEditData.Client?.Guid
    );
    this.validateForm.controls.startValue.setValue(
      this.editProjectStateService.projectEditData.StartDate
    );
    this.validateForm.controls.endValue.setValue(
      this.editProjectStateService.projectEditData.EndDate
    );
    this.validateForm.controls.description.setValue(
      this.editProjectStateService.projectEditData.Description
    );
    this.projectUpdate.Guid = this.projectEditStateData.Guid;
    this.projectOld.Guid = this.projectEditStateData.Guid;
    this.projectOld.ProjectName =
      this.editProjectStateService.projectEditData.ProjectName;
    this.projectOld.Description =
      this.editProjectStateService.projectEditData.Description;
    this.projectOld.ProjectType =
      this.editProjectStateService.projectEditData.ProjectType;
    this.projectOld.ProjectStatusGuid =
      this.editProjectStateService.projectEditData.ProjectStatus?.Guid;
    this.projectOld.ClientGuid =
      this.editProjectStateService.projectEditData.Client?.Guid;
    this.projectOld.SupervisorGuid =
      this.editProjectStateService.projectEditData.SupervisorGuid;
    this.projectOld.StartDate =
      this.editProjectStateService.projectEditData.StartDate;
    this.projectOld.EndDate =
      this.editProjectStateService.projectEditData.EndDate;
    this.disabled = false;

    if (this.validateForm.controls.endValue.value != null)
      this.projectOld.EndDate = this.validateForm.controls.endValue.value;
    else this.projectOld.EndDate = '';
    this.updateValueSeted = true;
    this.isSpinning = false;
  }

  projectMapper() {
    this.validateForm.valueChanges.subscribe(() => {
      if (this.validateForm.valid) {
        const status = this.projectStatuses.find(
          (p) => p.Guid == this.validateForm.controls.status.value
        );

        if (status)
          if (status.AllowResource) {
            this.projectResourceStateService.updateDisallowResource(false);
          } else this.projectResourceStateService.updateDisallowResource(true);

        this.projectStartdDate = this.validateForm.controls.startValue.value;
        if (!this.isOnEditstate) {
          this.projectCreate.ProjectName =
            this.validateForm.controls.projectName.value;

          this.projectCreate.SupervisorGuid =
            this.validateForm.controls.supervisor.value;
          this.projectCreate.StartDate =
            this.validateForm.controls.startValue.value;
          this.projectCreate.ProjectType =
            this.validateForm.controls.projectType.value;

          this.projectCreate.ProjectStatusGuid =
            this.validateForm.controls.status.value;

          this.projectCreate.Description =
            this.validateForm.controls.description.value;

          if (this.projectCreate.ProjectType == 'Internal') {
            for (let i = 0; i < this.clients.length; i++) {
              if (
                this.clients[i].ClientName.toLowerCase() ===
                'Excellerent'.toString().toLowerCase()
              ) {
                this.projectCreate.ClientGuid = this.clients[i].Guid;
              }
            }
          } else {
            this.projectCreate.ClientGuid =
              this.validateForm.controls.client.value;
          }
        } else {
          this.updateProject();
        }

        if (this.validateForm.controls.endValue.value != null)
          this.projectCreate.EndDate =
            this.validateForm.controls.endValue.value;
        else this.projectCreate.EndDate = '';
        this.projectCreateState.updateProjectDetails(this.projectCreate);
      } else {
        this.projectCreateState.updateProjectDetails({} as ProjectCreate);
        this.projectResourceStateService.updateDisallowResource(true);
      }
    });
  }

  typeChanged() {
    this.validateForm.controls.projectType.valueChanges.subscribe(() => {
      if (this.validateForm.controls.projectType.value == 'Internal') {
        for (let i = 0; i < this.clients.length; i++) {
          if (
            this.clients[i].ClientName.toLowerCase() ===
            'Excellerent'.toString().toLowerCase()
          ) {
            this.projectCreate.ClientGuid = this.clients[i].Guid;
          }
        }
      } else {
        this.projectCreate.ClientGuid = this.validateForm.controls.client.value;
      }
    });
  }

  checkClientInternal(client: string) {
    if (client === 'Excellerent') return true;
    else return false;
  }
  apiCalls() {
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response.filter(p=>p.IsActive && !p.IsDeleted);
    });

    this.clientService.getAll().subscribe((response: any) => {
      this.clients = response.Data;
    });

    this.projectStatusService.getAll().subscribe((res) => {
      this.projectStatuses = res;

      if (!this.isOnEditstate)
        for (let i = 0; i < this.projectStatuses.length; i++) {
          if (this.projectStatuses[i].StatusName == 'Active') {
            this.validateForm.controls.status.setValue(
              this.projectStatuses[i].Guid
            );
            break;
          }
        }
      else {
        const status = this.projectStatuses.find(
          (p) => p.Guid == this.validateForm.controls.status.value
        );

        if (status)
          if (status.AllowResource) {
            this.projectResourceStateService.updateDisallowResource(false);
          }
      }
    });

    this.projectService.getProjects().subscribe((response:any) => {
      this.projects = response;
      this.isSpinning=false;
    });
  }

  validateParojectNameWithClient() {
    this.validateForm.controls.client.valueChanges.subscribe(() => {
      let found = false;

      if (
        this.validateForm.controls.client.valid &&
        this.validateForm.controls.projectName.valid
      ) {
        if (this.projects != [])
          for (let i = 0; i < this.projects.length; i++) {
            if (
              this.validateForm.controls.client.value ==
                this.projects[i].Client?.Guid &&
              this.validateForm.controls.projectName.value.toLowerCase() ===
                this.projects[i].ProjectName.toString().toLowerCase()
            ) {
              found = true;

              this.projectNameExitsErrorMessage =
                'Project name already exists by  this ' +
                this.projects[i].Client?.ClientName +
                ' client';

              break;
            }
          }
      }

      if (found == true) {
        this.projectNameExits = true;

        this.validateForm.controls.projectName.setErrors({ invalidName: true });
      } else {
        this.projectNameExits = false;
        this.validateForm.controls.projectName.setErrors({
          invalidName: false,
        });
        this.validateForm.controls.projectName.updateValueAndValidity();
      }
    });
  }

  createRegistrationForm() {
    this.validateForm = this.fb.group({
      projectName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      client: ['Excellerent', [Validators.required]],
      projectType: ['External', [Validators.required]],
      status: [null, [Validators.required]],
      supervisor: [null, [Validators.required]],
      startValue: [null, [Validators.required]],
      endValue: [null],
      description: [''],
    });
  }

  createProject() {
    this.projectService.createProject();
  }

  saveProjectUpdate() {
    this.saveUpdateload=true;
    this.projectService.updateProject(this.projectUpdate).subscribe
    (suceess=>{
      this.saveUpdateload=false;
      this.router.navigateByUrl('projectmanagement');
      this.notification.success('Project updated successfully','');
      }  
      ,error=>  {
        this.saveUpdateload=false;
         this.notification.error('Project updated not saved','Please try again letter')
    });;
  }
  updateProject() {
    if (this.updateValueSeted && this.validateForm.valid) {
      this.projectUpdate.ProjectName =
        this.validateForm.controls.projectName.value;

      this.projectUpdate.ProjectType =
        this.validateForm.controls.projectType.value;
      this.projectUpdate.ProjectStatusGuid =
        this.validateForm.controls.status.value;
      this.projectUpdate.ClientGuid = this.validateForm.controls.client.value;
      this.projectUpdate.SupervisorGuid =
        this.validateForm.controls.supervisor.value;
      this.projectUpdate.StartDate =
        this.validateForm.controls.startValue.value;
      this.projectUpdate.EndDate = this.validateForm.controls.endValue.value;
      this.projectUpdate.Description =
        this.validateForm.controls.description.value;

      if (this.validateForm.controls.endValue.value != null)
        this.projectUpdate.EndDate = this.validateForm.controls.endValue.value;
      else this.projectUpdate.EndDate = '';
 
        

      if(this.updateValueSeted &&
      this.validateForm.valid &&
      (this.projectUpdate.ProjectName.trim() !== this.projectOld.ProjectName ||
        this.projectUpdate.ProjectType !== this.projectOld.ProjectType ||
        this.projectUpdate.ProjectStatusGuid !=
          this.projectOld.ProjectStatusGuid ||
        this.projectUpdate.ClientGuid !== this.projectOld.ClientGuid ||
        this.projectUpdate.SupervisorGuid !== this.projectOld.SupervisorGuid ||
        new Date(this.projectUpdate.StartDate).getTime() !==
          new Date(this.projectOld.StartDate).getTime() ||
        (this.validateForm.controls.endValue.value!=null &&
          new Date(this.projectUpdate.EndDate).getTime() !=
            new Date(this.projectOld.EndDate).getTime()) ||
            (this.projectUpdate.EndDate==''&& this.projectOld.EndDate!='')||
        this.projectUpdate.Description?.trim() !== this.projectOld.Description)
      ) {
        this.enableUpdateButton = true;
      } else this.enableUpdateButton = false;
    }
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    if (
      this.isOnEditstate &&
      (this.projectUpdate.EndDate != '' || this.projectUpdate.EndDate)
    )
      return (
        startValue.getTime() > new Date(this.projectUpdate.EndDate).getTime()
      );

    if (this.validateForm.controls.endValue.value)
      return (
        startValue.getTime() >
        this.validateForm.controls.endValue.value.getTime()
      );
    return false;
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.controls.startValue.value) {
      return false;
    }
    if (
      this.isOnEditstate &&
      (this.projectUpdate.StartDate != '' || this.projectUpdate.StartDate)
    )
      return (
        endValue.getTime() < new Date(this.projectUpdate.StartDate).getTime()
      );

    if (this.validateForm.controls.startValue.value)
      return (
        endValue.getTime() <=
        this.validateForm.controls.startValue.value.getTime()
      );
    return false;
  };

  onProjectDateSelected() {
    if (this.startValue.value !== null) {
      this.disabled = false;
    }
  }
  handleStartOpenChange(open: boolean): void {
    // if (!open) {
    //   this.endDatePicker.open();
    // }
  }

  handleEndOpenChange(open: boolean): void {}

  //Getter methods

  get projectName() {
    return this.validateForm.controls.projectName as FormControl;
  }

  get clientName() {
    return this.validateForm.controls.client as FormControl;
  }

  get projectType() {
    return this.validateForm.controls.projectType as FormControl;
  }

  get status() {
    return this.validateForm.controls.status as FormControl;
  }

  get supervisor() {
    return this.validateForm.controls.supervisor as FormControl;
  }

  get startValue() {
    return this.validateForm.controls.startValue as FormControl;
  }

  get endValue() {
    return this.validateForm.controls.endValue as FormControl;
  }

  updateProjectResourseList(resources: projectResourceType[]) {
    this.resources = resources;
  }

  selectChangeHandler(event: any) {
    this.selectedStatus = event.target.value;
  }

  showDeleteConfirm(): void {
    if (!this.enableUpdateButton && this.isOnEditstate)
      this.confimeresredirect();
    else if (this.validateForm.invalid) this.confimeresredirect();

    this.cancelModal = true;
  }

  confimeresredirect() {
    this.userSubmitted = false;
    this.cancelModal = false;
    this.router.navigateByUrl('projectmanagement');
  }

  rediretCancel() {
    this.cancelModal = false;
  }

  confirmCancel() {
    this.cancelModal = false;
  }

  routeOnUpdateValidation(index: number) {
    this.activeTabIndex = index;
  }
}
