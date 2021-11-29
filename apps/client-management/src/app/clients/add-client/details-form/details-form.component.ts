import { Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Client,  Employee, ClientDetailsService, ClientStatusService, EmployeeService, ClientDetailsAdd, ClientStatus } from '../../../core';



@Component({
  selector: 'exec-epp-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {
  inputValue?: string;
  filteredOptions: string[] = [];
  employees = [] as Employee[];
  clients = [] as Client[];
  clientStatuses = [] as ClientStatus[];
  clientCreate: ClientDetailsAdd = {} as ClientDetailsAdd;
  options: string[] = [];
  selectedValue="";
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clientDetailsService: ClientDetailsService,
    private employeeService: EmployeeService,
    private clientStatusService: ClientStatusService,
    private router: Router
  ) {
    //this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    this.createRegistrationForm();

    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;

    });

    this.clientDetailsService.getAll().subscribe((response) => {
      this.clients = response;

    });

    this.clientStatusService.getAll().subscribe((res: ClientStatus[]) => {
      this.clientStatuses = res;
      for(let i=0;i<this.clientStatuses.length;i++)
      {
        if(this.clientStatuses[i].StatusName=='Active')
        {
          this.selectedValue=this.clientStatuses[i].Guid;
        }
      }
    });

    console.log(this.clientStatuses[0].StatusName.toString());


    this.validateForm.valueChanges.subscribe(() => {
      if (this.validateForm.valid) {
        this.clientCreate.ClientName =
          this.validateForm.controls.ClientName.value;

        this.clientCreate.SalesPersonGuid =
          this.validateForm.controls.salesPerson.value;
        this.clientCreate.ClientStatusGuid =
          this.validateForm.controls.status.value.Guid;
        this.clientCreate.Description =
          this.validateForm.controls.description.value;


      } else {
        this.clientCreate = {} as ClientDetailsAdd;
      }
    });

  }





  onChange(value: string): void {
    if(this.inputValue==""){
this.filteredOptions=[];
    }
    else{
     for(let i=0; i<this.employees.length;i++)
     {
        this.options[i]=(this.employees[i].Name+'-'+this.employees[i].Role).toString();
     }
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
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
    status: ['Active', [Validators.required]],
    salesPerson: [null, [Validators.required]],
    description: [''],
  });
}
}


