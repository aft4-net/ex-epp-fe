import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit {

  constructor(private router:Router) {

   }
   clientSelected=true;
  ngOnInit(): void {

  }

  clientTab()
  {
    this.clientSelected=true;
  }

  projectTab()
{
  this.clientSelected=false;
}

addProjectPage()
{
  this.router.navigateByUrl('client-project/add-project');
 
}

}
