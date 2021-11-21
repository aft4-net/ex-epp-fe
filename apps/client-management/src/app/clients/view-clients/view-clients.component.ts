import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent  {

  constructor(private router:Router) { }

  addClientPage()
  {
     this.router.navigateByUrl('clients/add-client');
  }

}
