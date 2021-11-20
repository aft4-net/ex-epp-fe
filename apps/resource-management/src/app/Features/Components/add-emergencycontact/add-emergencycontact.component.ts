import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'exec-epp-add-emergencycontact',
  templateUrl: './add-emergencycontact.component.html',
  styleUrls: ['./add-emergencycontact.component.scss'],
})
export class AddEmergencycontactComponent implements OnInit {
  @Input() isStandalone = true;

  listOfStates: string[] = [];
  isEthiopia = false;
  EForm!: FormGroup;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() result: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(private fb: FormBuilder) {}

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
      FirstName: [null, [Validators.required]],
      FatherName: [null, [Validators.required]],
      Relationship: [null, [Validators.required]],
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
}
