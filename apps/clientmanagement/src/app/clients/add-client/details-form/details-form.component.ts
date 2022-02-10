import {
AddClientStateService,
Client,
ClientDetailCreate,
ClientDetailsService,
ClientStatus,
ClientStatusService,
Employee,
EmployeeService,
UpdateClient,
UpdateClientStateService,
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
  updateClient: UpdateClient = {} as UpdateClient;
  options: string[] = [];
  selectedValue = '';
  clientNameExistErrorMessage='';
  validateForm!: FormGroup;

  hideIfAdd: any;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private clientStatusService: ClientStatusService,
    private addClientStateService: AddClientStateService,
    private clientDetailsService: ClientDetailsService,
    private updateClientState: UpdateClientStateService,
  ) {}

  ngOnInit(): void {
    this.createRegistrationForm();
    this.setValue();
    this.hideIfAdd = this.updateClientState.isAdd;
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
    });
    this.clientDetailsService.getAll().subscribe((response: any) => {
      this.clients = response.Data;
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

    this.validateForm.controls.clientName.valueChanges.subscribe(()=>{

      this.checkClientName();
    });

    this.validateForm.valueChanges.subscribe(() => {
      if(this.updateClientState.isEdit)
      {
        if (this.validateForm.valid) {
          this.updateClient.ClientName =
            this.validateForm.controls.clientName.value;
          this.updateClient.SalesPersonGuid =this.validateForm.controls.salesPerson.value;
          this.updateClient.ClientStatusGuid =
            this.validateForm.controls.status.value;
          this.updateClient.Description =
            this.validateForm.controls.description.value;
            this.updateClient.Guid=this.updateClientState.UpdateClientData.Guid;
            this.updateClient.ClientContacts=this.updateClientState.UpdateClientData.ClientContacts;
            this.updateClient.CompanyContacts=this.updateClientState.UpdateClientData.CompanyContacts;
            this.updateClient.OperatingAddress=this.updateClientState.UpdateClientData.OperatingAddress;
            this.updateClient.BillingAddress=this.updateClientState.UpdateClientData.BillingAddress;

          this.updateClientState.updateClient(
            this.updateClient
          );
        }

      }
else{
      if (this.validateForm.valid) {
        this.clientDetailCreate.ClientName =
          this.validateForm.controls.clientName.value;
        this.clientDetailCreate.SalesPersonGuid =this.validateForm.controls.salesPerson.value;
        this.clientDetailCreate.ClientStatusGuid =
          this.validateForm.controls.status.value;
        this.clientDetailCreate.Description =
          this.validateForm.controls.description.value;


        this.addClientStateService.updateAddClientDetails(
          this.clientDetailCreate
        );
      } else this.addClientStateService.restAddClientDetails();
    }
    });
  }
  setValue(){
    if(this.updateClientState.isEdit && this.updateClientState.UpdateClientData!==null)
    {
      this.validateForm=this.fb.group({
        clientName: [
          this.updateClientState.UpdateClientData.ClientName,

        ],
        status: [this.updateClientState.UpdateClientData.ClientStatusGuid],
        salesPerson: [this.updateClientState.UpdateClientData.SalesPersonGuid],
        description:[this.updateClientState.UpdateClientData.Description],
      });
    }

  }

  checkClientName() {

      for (let i = 0; i < this.clients.length; i++) {

        if (
          this.validateForm.value['clientName'].toLowerCase() ===
          this.clients[i].ClientName.toString().toLowerCase()
        ) {
          this.clientNameExistErrorMessage = 'Client name already exists';
          this.validateForm.controls.clientName.setErrors({'incorrect':true});
          this.validateForm.controls.salesPerson.updateValueAndValidity({ onlySelf: true });
          break;
        } else {
          this.clientNameExistErrorMessage = '';
         this.validateForm.controls.salesPerson.updateValueAndValidity({ onlySelf: false });
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
        '',
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
