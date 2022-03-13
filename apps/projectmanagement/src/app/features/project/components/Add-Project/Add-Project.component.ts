import {Component, OnDestroy,OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { Client,ClientService, Employee,EmployeeService,
  Project, ProjectCreate,ProjectDetail,projectResourceType,
  ProjectService,ProjectStatus,ProjectStatusService, AddProjectStateService,
  EditProjectStateService, ProjectEdit,ProjectResourceStateService,ProjectValidationService,
} from '../../../../core';

import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'exec-epp-Add-Project',
  templateUrl: './Add-Project.component.html',
  styleUrls: ['./Add-Project.component.css'],
  providers: [ProjectValidationService]
})
export class AddProjectComponent implements OnInit, OnDestroy {
  projectStatus!: boolean;
  selectedStatus!: string;
  typeSelected?: string;
  validateForm!: FormGroup;
  form!:FormGroup;
  currentDate = Date.now.toString();
  projectCreate: ProjectDetail = {} as ProjectDetail;
  clients = [] as Client[];
  employees = [] as Employee[];
  projects = [] as Project[];
  projectStatuses = [] as ProjectStatus[];
  enableAddResourceTab = false;
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
  saveUpdateload = false;
  internalClinetGuid="";
  resources: projectResourceType[] = [] as projectResourceType[];
  formErrors = {
    projectName: null,
    projectType: null,
    supervisor: null,
    startValue: null,
    client:null,
    status:null
  };


  constructor(
    private validation: ProjectValidationService,
    private notification: NzNotificationService,
    private projectResourceStateService: ProjectResourceStateService,
    private projectCreateState: AddProjectStateService,
    private editProjectStateService: EditProjectStateService,
    private fb: FormBuilder,
    private projectService: ProjectService,
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
    this.apiCalls();
    this.createRegistrationForm();
    this.projectMapper();
    this.typeChanged();

    if ('/projectmanagement/edit-project' === this.router.url && !this.isOnEditstate)
      this.router.navigateByUrl('projectmanagement');
    if (this.isOnEditstate) this.setValueForUpdate();
  }

  setValueForUpdate() {
    this.projectEditStateData = this.editProjectStateService.projectEditData;
    this.validateForm.controls.projectName.setValue(
      this.editProjectStateService.projectEditData.ProjectName);
    this.validateForm.controls.supervisor.setValue(
      this.editProjectStateService.projectEditData.SupervisorGuid );
    this.validateForm.controls.projectType.setValue(
      this.editProjectStateService.projectEditData.ProjectType);
    this.validateForm.controls.status.setValue(
      this.editProjectStateService.projectEditData.ProjectStatus?.Guid);
    this.validateForm.controls.client.setValue(
      this.editProjectStateService.projectEditData.Client?.Guid);
    this.validateForm.controls.startValue.setValue(
      this.editProjectStateService.projectEditData.StartDate);
    this.validateForm.controls.endValue.setValue(
      this.editProjectStateService.projectEditData.EndDate);
    this.validateForm.controls.description.setValue(
      this.editProjectStateService.projectEditData.Description );
    this.projectUpdate.Guid = this.projectEditStateData.Guid;
    this.projectOld.Guid = this.projectEditStateData.Guid;
    this.projectOld.ProjectName =this.editProjectStateService.projectEditData.ProjectName;
    this.projectOld.Description =this.editProjectStateService.projectEditData.Description;
    this.projectOld.ProjectType =this.editProjectStateService.projectEditData.ProjectType;
    this.projectOld.ProjectStatusGuid =this.editProjectStateService.projectEditData.ProjectStatus?.Guid;
    this.projectOld.ClientGuid = this.editProjectStateService.projectEditData.Client?.Guid;
    this.projectOld.SupervisorGuid = this.editProjectStateService.projectEditData.SupervisorGuid;
    this.projectOld.StartDate =this.editProjectStateService.projectEditData.StartDate;
    this.projectOld.EndDate = this.editProjectStateService.projectEditData.EndDate;
    this.disabled = false;
    if(this.validateForm.controls.endValue.value != null )
    this.projectOld.EndDate = this.validateForm.controls.endValue.value
    else
    this.projectOld.EndDate = '';
    this.updateValueSeted = true;
    this.isSpinning = false;
  }

  projectMapper() {
    this.validateForm.valueChanges.subscribe(() => {
      this.formErrors = this.validation.getValidationErrors(
                         this.validateForm );
      if (this.validateForm.valid) 
          this.onValidForm();            
       else {
          if(!this.isOnEditstate)
        this.projectCreateState.updateProjectDetails({} as ProjectCreate);
        this.projectResourceStateService.updateDisallowResource(true);
      }
    });
  }

  onValidForm()
  {
    const status = this.projectStatuses.find(
      (p) => p.Guid == this.validateForm.controls.status.value
    );

    if (status)
      if (status.AllowResource) {
        this.projectResourceStateService.updateDisallowResource(false);
      } else this.projectResourceStateService.updateDisallowResource(true);

    this.projectStartdDate = this.validateForm.controls.startValue.value;
    if (!this.isOnEditstate)          
     this.onAddProject()   
    else 
      this.onUpdateProject();
  }

  onAddProject()
  {
    if (this.validateForm.controls.endValue.value === null ||
      typeof this.validateForm.controls.endValue.value== 'undefined' )    
    this.projectCreate.EndDate = "";
    else
    this.projectCreate.EndDate =this.validateForm.controls.endValue.value;
      this.projectCreate.ProjectName = this.validateForm.controls.projectName.value;
      this.projectCreate.SupervisorGuid = this.validateForm.controls.supervisor.value;
      this.projectCreate.StartDate= this.validateForm.controls.startValue.value;
      this.projectCreate.ProjectType = this.validateForm.controls.projectType.value;
      this.projectCreate.ProjectStatusGuid =this.validateForm.controls.status.value;
      this.projectCreate.Description =  this.validateForm.controls.description.value;
      this.projectCreate.ClientGuid = this.validateForm.controls.client.value;
    this.projectCreateState.updateProjectDetails(this.projectCreate);
  }

  onUpdateProject() {
    if (this.updateValueSeted && this.validateForm.valid) {
      this.projectUpdate.ProjectName =this.validateForm.controls.projectName.value;
      this.projectUpdate.ProjectType =this.validateForm.controls.projectType.value;
      this.projectUpdate.ProjectStatusGuid =this.validateForm.controls.status.value;
      this.projectUpdate.ClientGuid = this.validateForm.controls.client.value;
      this.projectUpdate.SupervisorGuid =this.validateForm.controls.supervisor.value;
      this.projectUpdate.StartDate =this.validateForm.controls.startValue.value;
      this.projectUpdate.EndDate = this.validateForm.controls.endValue.value;
      this.projectUpdate.Description =this.validateForm.controls.description.value;
      this.validateForm.controls.endValue.value != null ?
      this.projectUpdate.EndDate = this.validateForm.controls.endValue.value:
      this.projectUpdate.EndDate = ''; 

      this.enableUpdateButton= (this.updateValueSeted && this.validateForm.valid && 
     (this.projectUpdate.ProjectName.trim() !== this.projectOld.ProjectName.trim() ||
     this.projectUpdate.ProjectType !== this.projectOld.ProjectType ||
     this.projectUpdate.ProjectStatusGuid !=this.projectOld.ProjectStatusGuid ||
     this.projectUpdate.ClientGuid !== this.projectOld.ClientGuid ||
     this.projectUpdate.SupervisorGuid !== this.projectOld.SupervisorGuid ||
     this.projectUpdate.Description?.trim() !== this.projectOld.Description?.trim())||
      (this.validateForm.controls.endValue.value != null &&
      new Date(this.projectUpdate.EndDate).getTime() != new Date(this.projectOld.EndDate).getTime()) ||
      (this.projectUpdate.EndDate == '' && this.projectOld.EndDate != '') )
      
    }
  }
  typeChanged() {
    this.validateForm.controls.projectType.valueChanges.subscribe(() => {
      if (this.validateForm.controls.projectType.value == 'Internal') {
        this.validateForm.controls.client.setValue(this.internalClinetGuid);
      }    
    });
  }

  apiCalls() {
    this.clientService.getAll().subscribe((response: any) => {
      this.clients = response.Data;
      for (let i = 0; i < this.clients.length; i++) {
        if (  this.clients[i].ClientName.toLowerCase().trim() ===
          'Excellerent'.toString().toLowerCase().trim() ) {
            this.internalClinetGuid=this.clients[i].Guid;
          break;
        }
      }
    });

    this.projectStatusService.getAll().subscribe((res) => {
      this.projectStatuses = res;
      if (!this.isOnEditstate)
        for (let i = 0; i < this.projectStatuses.length; i++) {
          if (this.projectStatuses[i].StatusName == 'Active') {
            this.validateForm.controls.status.setValue(
              this.projectStatuses[i].Guid );
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

    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response.filter((p) => p.IsActive && !p.IsDeleted);
      this.validation.projects$.subscribe(()=> {    
        this.isSpinning = false;
      });
    });

  }
  createRegistrationForm() {
    this.validateForm = this.fb.group(
      {
        projectName: [
          null,{validators:[Validators.required,
            Validators.minLength(2),
            Validators.maxLength(70),]},
        ],
        client: [null, { validators:[Validators.required]} ],
        projectType: ['External', { validators:[Validators.required] }],
        status: [null, { validators:[Validators.required]}],
        supervisor: [null, { validators:[Validators.required]}],
        startValue: [null, { validators:[Validators.required]}],
        endValue: [""],
        description: [null],
      },
      {validators:  this.validation.projectNameExitWithClient(
        'projectName','client', this.isOnEditstate)}
    );
  }
  saveProjectUpdate() {
    this.saveUpdateload = true;
    this.projectService.updateProject(this.projectUpdate).subscribe(
      () => {
        this.saveUpdateload = false;
        this.router.navigateByUrl('projectmanagement');
        this.notification.success('Project updated successfully', '');
      },
      () => {
        this.saveUpdateload = false;
        this.notification.error(
          'Project updated not saved',
          'Please try again letter'
        );
      }
    );
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    if (this.isOnEditstate &&(this.projectUpdate.EndDate != '' || this.projectUpdate.EndDate))
      return (startValue.getTime() > new Date(this.projectUpdate.EndDate).getTime());

    if (this.validateForm.controls.endValue.value)
      return (startValue.getTime() >this.validateForm.controls.endValue.value.getTime());
    return false;
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.controls.startValue.value) 
      return false;
    
    if (this.isOnEditstate && (this.projectUpdate.StartDate != '' || this.projectUpdate.StartDate) )
      return (
        endValue.getTime() < new Date(this.projectUpdate.StartDate).getTime()
      );

    if (this.validateForm.controls.startValue.value)
      return (
        endValue.getTime() <= this.validateForm.controls.startValue.value.getTime()
      );
    return false;
  };

  onProjectDateSelected() {
    if (this.validateForm.controls.startValue.value !== null) {
      this.disabled = false;
    }
  }

  get projectType() {
    return this.validateForm.controls.projectType as FormControl;
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
