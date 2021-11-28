import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit  {

  constructor(private router:Router) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addClientPage()
  {
     this.router.navigateByUrl('clients/add-client');
  }

}
