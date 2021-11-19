import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../../Models/address.model';

@Component({
  selector: 'exec-epp-emergency-contact-addresses',
  templateUrl: './emergency-contact-addresses.component.html',
  styleUrls: ['./emergency-contact-addresses.component.scss']
})
export class EmergencyContactAddressesComponent implements OnInit {

  constructor(
    private readonly _route: Router
  ) { }

  ngOnInit(): void {
  }

  onAction(event: {type: string, addresses: Address[]}){

    if(event.type === "back"){
      this._route.navigateByUrl('/personal-info')
    }
    else{
      this._route.navigateByUrl('/personal-info')
    }
  }

}
