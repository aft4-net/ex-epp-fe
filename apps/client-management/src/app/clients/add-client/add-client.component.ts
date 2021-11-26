import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { ClientService } from '../../core';


@Component({
  selector: 'exec-epp-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  position: NzTabPosition = 'left';
  constructor(private router:Router,private clientService:ClientService) { }

  ngOnInit(): void {
  }

  addClient()
  {
    this.clientService.addClient();
  }
  clientsPage()
  {
     this.router.navigateByUrl('clients');
  }
  
}
