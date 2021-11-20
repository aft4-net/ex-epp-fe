
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Address, Addresss } from '../../Models/address.model';

import { EmergencyContact, IEmergencyContact } from '../../Models/emergencycontact';
import { LocationPhoneService } from '../../Services/address/location-phone.service';

import { EmergencycontactService } from '../../Services/emergencycontact/emergencycontact.service';

import { NzButtonSize } from 'ng-zorro-antd/button';


@Component({
  selector: 'exec-epp-add-emergencycontact',
  templateUrl: './add-emergencycontact.component.html',
  styleUrls: ['./add-emergencycontact.component.scss'],
})


export class AddEmergencycontactComponent implements OnInit {

  // Needed to bind formControlName
@Input() formGroupParent!: FormGroup ;
@Input() formGroupControlName!: string ;
// FormControl store validators
control!: FormControl 
  EForm!: FormGroup;
    emcaddresses: Address[] = []
 
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() result: EventEmitter<unknown> = new EventEmitter<unknown>();
 

  constructor(private fb: FormBuilder,
    public service : EmergencycontactService,
    private toastr: ToastrService,
    // public ddresscomp :AddressNewComponent,
    private _locationPhoneService: LocationPhoneService,
    
    ) {}

    AddForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required,]),
      relationship: new FormControl('', [Validators.required]),
      address: this.fb.array([this.createAddress()], Validators.required),
  
      
    });


    someFrom = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required,]),
      relationship: new FormControl('', [Validators.required]),
            
    });
  
  

  createAddress(): FormGroup {
    return this.fb.group({
      country: ['null', [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      subCityZone: [null, [Validators.required]],
      woreda: [null],
      houseNumber: [null],
      postalCode: [null],
      residencialPhoneNumber: [null, [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    
    
    this.EForm = this.fb.group({
      firstName: [null, [Validators.required]],
      fatherName: [null, [Validators.required]],
      relationship: [null, [Validators.required]],
     Address: this.fb.array([this.createAddress()], Validators.required),
    });
 


  }

  get Addresses(): FormArray {
    return <FormArray>this.EForm.get('Address');
  }

  addAddress() {
    this.Addresses.push(this.createAddress());
  }
  removeAddress(i: number) {
    this.Addresses.removeAt(i);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  panels = [
    {
      active: true,
      name: 'Add Address',
    },
  ];
 

  
  submitForm(): void {
     if (this.someFrom.valid) {
      console.log('submit', this.AddForm.value);
      console.log("Added successfully");
    this.service.postEmergencycontact(this.someFrom.value);
    this.toastr.success('Added successfully', 'Emergency Contact Register')
    }
    
    else {
      Object.values(this.someFrom.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.toastr.error('Not Added!',)
    }
  }




  




///















}
