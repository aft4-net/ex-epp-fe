import { Component, OnInit } from '@angular/core';

import { Address } from './../../../../../resource-management/src/app/Features/Models/address.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit  {
   values = [
    {client:'CocaCola',address:'Ethiopia',status:'Active',sales_person:'Yonas',client_contact:'Ayalew',company_contact:'Seifu'},
    {client:'CocaCola',address:'USA',status:'Active',sales_person:'Abebe',client_contact:'Jhon',company_contact:'Jimy'},
    {client:'CocaCola',address:'USA',status:'Active',sales_person:'Zerihun',client_contact:'Henock',company_contact:'Haile'},
    {client:'CocaCola',address:'Canada',status:'Active',sales_person:'Robel',client_contact:'Yonatan',company_contact:'Pete'},
  ]
  namesofclients = [{text:'Excelerent',value:'Excelerent',checked:true},
  {text:'CocaCola',value:'CocaCola',checked:false},
  {text:'Amazon',value:'Amazone',checked:false}];

  namesoflocations = [{text:'Ethiopia',value:'Ethiopia',checked:true},
  {text:'USA',value:'USA',checked:false},
  {text:'Canada',value:'Canada',checked:false}];
  namesofStatuses = [{text:'Active',value:'Active',checked:true},
  {text:'Signed',value:'Signed',checked:false},
  {text:'Terminated',value:'Terminated',checked:false}];
  constructor(private router:Router) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addClientPage()
  {
     this.router.navigateByUrl('clients/add-client');
  }

}
