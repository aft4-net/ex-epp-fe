import { ClientService } from './../../core/services/client.service';


import { Address } from './../../../../../resource-management/src/app/Features/Models/address.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Client } from '../../core/models/get/client';




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
  
  constructor(private router:Router,private _clientservice:ClientService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this._clientservice.getAll().subscribe((clientRespose:any)=>{
      this.client=clientRespose.Data;
      console.log(this.client);
      

    })
    //this._clientservice.getAll().subscribe((response:Client)=>{
      //this.client=response;
    //})
  }
  
  addClientPage()
  {
     this.router.navigateByUrl('clients/add-client');
  }
  
}
