import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  ClientDetails,
  ClientStatus,
  Employee,
  ClientStatusService,
  EmployeeService,
  ClientDetailCreate,
  AddClientStateService,
} from '../../../core';

@Component({
  selector: 'exec-epp-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent implements OnInit {
  inputValue?: string;
  filteredOptions: string[] = [];
  employees = [] as Employee[];
  clients = [] as ClientDetails[];
  clientStatuses = [] as ClientStatus[];
  clientDetailCreate: ClientDetailCreate = {} as ClientDetailCreate;
  options: string[] = [];
  selectedValue = '';

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

  onChange(value: string): void {
    if (this.inputValue == '') {
      this.filteredOptions = [];
    } else {
      for (let i = 0; i < this.employees.length; i++) {
        this.options[i] = (
          this.employees[i].Name +
          '-' +
          this.employees[i].Role
        ).toString();
      }
      this.filteredOptions = this.options.filter(
        (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
  }

  get salesPerson() {
    return this.validateForm.controls.salesPerson as FormControl;
  }
  get clientName() {
    return this.validateForm.controls.clientName as FormControl;
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
      status: [null, [Validators.required]],
      salesPerson: [null, [Validators.required]],
      description: [''],
    });
  }
}
