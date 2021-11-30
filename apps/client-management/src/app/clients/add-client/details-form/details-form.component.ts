import {
AddClientStateService,
Client,
ClientDetailCreate,
ClientStatus,
ClientStatusService,
Employee,
EmployeeService,
} from '../../../core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'exec-epp-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent implements OnInit {
  inputValue?: string;
  filteredOptions: string[] = [];
  employees = [] as Employee[];
  clients = [] as Client[];
  clientStatuses = [] as ClientStatus[];
  clientDetailCreate: ClientDetailCreate = {} as ClientDetailCreate;
  options: string[] = [];
  selectedValue = '';
  clientNameExistErrorMessage='';
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private clientStatusService: ClientStatusService,
    private addClientStateService: AddClientStateService
  ) {}

  ngOnInit(): void {
    this.createRegistrationForm();

    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
    });

    this.clientStatusService.getAll().subscribe((res: ClientStatus[]) => {
      this.clientStatuses = res;
      for (let i = 0; i < this.clientStatuses.length; i++) {
        if (this.clientStatuses[i].StatusName == 'Active') {
          this.selectedValue = this.clientStatuses[i].Guid;
          this.validateForm.controls.status.setValue(this.clientStatuses[i].Guid);
        }
      }
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (this.validateForm.valid) {
        this.clientDetailCreate.ClientName =
          this.validateForm.controls.clientName.value;
        this.clientDetailCreate.SalesPersonGuid =
          this.validateForm.controls.salesPerson.value.Guid;
        this.clientDetailCreate.ClientStatusGuid =
          this.validateForm.controls.status.value;
        this.clientDetailCreate.Description =
          this.validateForm.controls.description.value;


        this.addClientStateService.updateAddClientDetails(
          this.clientDetailCreate
        );
      } else this.addClientStateService.restAddClientDetails();
    });
  }

  checkClientName() {
    var name = this.validateForm.value['clientName'];

      for (let i = 0; i < this.clients.length; i++) {
        if (
          name.toLowerCase() ===
          this.clients[i].ClientName.toString().toLowerCase()
        ) {
          this.clientNameExistErrorMessage = 'Client name already exists';
          break;
        } else {
          this.clientNameExistErrorMessage = '';
        }
      }

  }

  handleError(): void {
        if (this.validateForm.controls.salesPerson.invalid) {
          this.validateForm.controls.salesPerson.markAsDirty();
          this.validateForm.controls.salesPerson.updateValueAndValidity({ onlySelf: true });
       }
}

  get salesPerson() {
    return this.validateForm.controls.salesPerson as FormControl;
  }
  get clientName() {
    return this.validateForm.controls.clientName as FormControl;
  }
  get description() {
    return this.validateForm.controls.description as FormControl;
  }

  createRegistrationForm() {
    this.validateForm = this.fb.group({
      clientName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),

        ],
      ],
      status: ['Active', [Validators.required]],
      salesPerson: ['', [Validators.required]],
      description:['',[Validators.maxLength(250)]],
    });
  }
}
