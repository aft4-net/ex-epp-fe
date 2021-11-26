import { Component, OnInit } from "@angular/core";

import { Client } from "../../core/models/get";
import { ClientService } from "../../core/services/client.service";
import { Router } from "@angular/router";

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
  namesofclients = [{text:'Excelerent',value:'Excelerent',checked:true},
  {text:'CocaCola',value:'CocaCola',checked:false},
  {text:'Amazon',value:'Amazone',checked:false}];

  namesoflocations = [{text:'Ethiopia',value:'Ethiopia',checked:true},
  {text:'USA',value:'USA',checked:false},
  {text:'Canada',value:'Canada',checked:false}];
  namesofStatuses = [{text:'Active',value:'Active',checked:true},
  {text:'Signed',value:'Signed',checked:false},
  {text:'Terminated',value:'Terminated',checked:false}];

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
