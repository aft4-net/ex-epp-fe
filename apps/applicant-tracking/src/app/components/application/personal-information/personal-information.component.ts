import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'; 

@Component({
  selector: 'exec-epp-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  previewImage!: string;
  personalInformation = new FormGroup({ 
  imgPhoto: new FormControl('', [Validators.required]),
  firstName: new FormControl('', [Validators.required]),
  lastName: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  country: new FormControl('', [Validators.required]),
  phoneNo: new FormControl('', [Validators.required]),
});
get signUpEmail(): AbstractControl | null {
  return this.personalInformation?.get('email');
}

constructor() {}

ngOnInit(): void {
  
}
}


