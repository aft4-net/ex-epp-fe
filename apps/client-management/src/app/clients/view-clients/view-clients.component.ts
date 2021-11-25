import { ClientService } from './../../core/services/client.service';


import { Address } from './../../../../../resource-management/src/app/Features/Models/address.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Client } from 'apps/project-management/src/app/core';



@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit  {
  client:Client[]=[];
   values = [
    {client:'CocaCola',address:'Ethiopia',status:'Active',sales_person:'Yonas',client_contact:'Ayalew',company_contact:'Seifu'},
    {client:'McDonalds',address:'USA',status:'Active',sales_person:'Abebe',client_contact:'Jhon',company_contact:'Jimy'},
    {client:'Apple',address:'USA',status:'Active',sales_person:'Zerihun',client_contact:'Henock',company_contact:'Haile'},
    {client:'Pepsi',address:'Canada',status:'Active',sales_person:'Robel',client_contact:'Yonatan',company_contact:'Pete'},
  ]

  listOfColumns = [
    {
      id: 'Client',
      label: 'Client',
      isChecked: true,
      compare:true
    },
    {
      id: 'Location',
      label: 'Location',
      isChecked: true,
      compare:true
    },
    {
      id: 'Status',
      label: 'Status',
      isChecked: true,
      compare:false
    },
    {
      id: 'SalesPerson',
      label: 'SalesPerson',
      isChecked: true,
      compare:false
    },
    {
      id: 'ClientContact',
      label: 'ClientContact',
      isChecked: false,
      compare:false
    },
    {
      id: 'CompanyContact',
      label: 'CompanyContact',
      isChecked: false,
      compare:false
    },
  ]

  constructor(private router:Router,private _clientservice:ClientService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this._clientservice.getAll().subscribe((data:any)=>{
      this.client=data;

    })
  }

  onDefaultClick() {
    this.listOfColumns[0].isChecked = true;
    this.listOfColumns[1].isChecked = true;
    this.listOfColumns[2].isChecked = true;
    this.listOfColumns[3].isChecked = true;
    this.listOfColumns[4].isChecked = false;
    this.listOfColumns[5].isChecked = false;
  }

  addClientPage()
  {
     this.router.navigateByUrl('clients/add-client');
  }

}
