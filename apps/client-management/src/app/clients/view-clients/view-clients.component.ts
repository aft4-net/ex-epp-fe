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

  sortByParam="";
  sortDirection = "asc";

   values = [
    {client:'CocaCola',address:'Ethiopia',status:'Active',sales_person:'Yonas',client_contact:'Ayalew',company_contact:'Seifu'},
    {client:'McDonalds',address:'USA',status:'On-Hold',sales_person:'Abebe',client_contact:'Jhon',company_contact:'Jimy'},
    {client:'Apple',address:'USA',status:'Active',sales_person:'Zerihun',client_contact:'Henock',company_contact:'Haile'},
    {client:'Pepsi',address:'Canada',status:'Terminated',sales_person:'Robel',client_contact:'Yonatan',company_contact:'Pete'},
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
    },
    {
      id: 'Location',
      label: 'Location',
      isChecked: true,
    },
    {
      id: 'Status',
      label: 'Status',
      isChecked: true,
    },
    {
      id: 'SalesPerson',
      label: 'SalesPerson',
      isChecked: true,
    },
    {
      id: 'ClientContact',
      label: 'ClientContact',
      isChecked: false,
    },
    {
      id: 'CompanyContact',
      label: 'CompanyContact',
      isChecked: false,
    },
  ]

  constructor(private router:Router,private _clientservice:ClientService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this._clientservice.getAll().subscribe((data:any)=>{
      this.client=data;

    })
  }

  sorter(id:number) {
    if (id === 1){
      this.sortByParam = "client";
    } else if (id === 2){
      this.sortByParam = "address";
    }else if (id === 3) {
      this.sortByParam = "status";
    } else if (id === 4) {
      this.sortByParam = "sales_person";
    }

    if (this.sortDirection === "desc") {
      this.sortDirection = "asc"
    } else {
      this.sortDirection = "desc"
    }
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
