import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from '../../Models/address.model';
import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-emergency-contact-addresses',
  templateUrl: './emergency-contact-addresses.component.html',
  styleUrls: ['./emergency-contact-addresses.component.scss']
})
export class EmergencyContactAddressesComponent implements OnInit {

  constructor(
    private readonly _route: Router,
    // private readonly _employeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  onAction(event: {type: string, addresses: Address[]}){

    // this._employeService.employee$
    // .subscribe((employee: Employee) => {
    //   // employee.EmergencyContact. = event.addresses
    //   // this._employeService.setEmployeeData(employee)
    // })

    if(event.type === "back"){
      this._route.navigateByUrl('/personal-info')
    }
    else{
      this._route.navigateByUrl('/personal-info')
    }
  }

}
