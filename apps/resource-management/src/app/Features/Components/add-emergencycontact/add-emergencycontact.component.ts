import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Address } from '../../Models/address.model';

import {
  EmergencyContact,
  IEmergencyContact,
} from '../../Models/emergencycontact';
import { LocationPhoneService } from '../../Services/address/location-phone.service';

import { EmergencycontactService } from '../../Services/emergencycontact/emergencycontact.service';

import { NzButtonSize } from 'ng-zorro-antd/button';
import { AddressNewComponent } from '../address-new/address-new.component';
import { AttendanceService } from '../../Services/address/attendance.service';

@Component({
  selector: 'exec-epp-add-emergencycontact',
  templateUrl: './add-emergencycontact.component.html',
  styleUrls: ['./add-emergencycontact.component.scss'],
})
export class AddEmergencycontactComponent implements OnInit {
  // Needed to bind formControlName
  @Input() formGroupParent!: FormGroup;
  @Input() formGroupControlName!: string;
  @ViewChild(AddressNewComponent) child: any;
  // FormControl store validators
  control!: FormControl;
  EForm!: FormGroup;
  emcaddresses: Address[] = [];
  countries: string[] = [];

  listofCodes: string[] = [];

  listOfStates: string[] = [];

  isEthiopia = false;
  emc!: IEmergencyContact;
  emc1!: IEmergencyContact;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() result: EventEmitter<{ type: string; addresses: Address[] }> =
    new EventEmitter<{ type: string; addresses: Address[] }>();

  constructor(
    private fb: FormBuilder,
    public service: EmergencycontactService,
    private _locationPhoneService: LocationPhoneService,
    private _attendanceService: AttendanceService,
    private toastr: ToastrService // public ddresscomp :AddressNewComponent,
  ) {
    this._locationPhoneService
      .getListofCountries()
      .subscribe((response: string[]) => {
        this.countries = response;
      });
    this._locationPhoneService
      .getCountriesPhoneCode()
      .subscribe((response: string[]) => {
        this.listofCodes = response;
      });
    this.listOfStates = [];
  }

  someFrom = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    relationship: new FormControl('', [Validators.required]),
  });

  AddForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    fatherName: new FormControl(null, [Validators.required]),
    relationship: new FormControl(null, [Validators.required]),
    address: this.fb.group({
      country: [null],
      state: [null],
      city: [null ],
      subCityZone: [null],
      woreda: [null],
      houseNumber: [null],
      postalCode: [null],
      //phoneNumberPrefix: ['+251'],
      residencialPhoneNumber: [null],
    }),
    // Address: this.fb.array([this.createAddress()], Validators.required),
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
    this.emc1 = {
      guid: '9fa85f64-5717-4562-b3fc-2c963f66afa1',
      isActive: true,
      isDeleted: true,
      createdDate: '2021-11-22T00:45:19.900Z',
      createdbyUserGuid: '9fa85f64-5717-4562-b3fc-2c963f66afa1',
      firstName: 'SImbo',
      fatherName: 'Temesgen',
      relationship: 'Brother',
      address: [
        {
          guid: '9fa85f64-5717-4562-b3fc-2c963f66afa1',
          isActive: true,
          isDeleted: true,
          createdDate: '2021-11-22T00:45:19.900Z',
          createdbyUserGuid: '9fa85f64-5717-4562-b3fc-2c963f66afa1',
          phoneNumber: 'string',
          country: 'string',
          stateRegionProvice: 'string',
          city: 'string',
          subCityZone: 'string',
          woreda: 'string',
          houseNumber: 'string',
          postalCode: 0,
        },
      ],
    };
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
      console.log('submit', this.someFrom.value);
      console.log('Added successfully');
      this.service.postEmergenycContacts(this.someFrom.value).subscribe(
        (res) => {
          this.service.refreshList();
          // this.toastr.success('Submitted successfully', 'Payment Detail Register')
        },
        (err: any) => {
          console.log(err);
        }
      );

      this.toastr.success('Added successfully', 'Emergency Contact Register');
    } else {
      Object.values(this.someFrom.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.toastr.error('Not Added!');
    }
  }

  submitFormall(): void {
     if (this.AddForm.valid) {
    console.log('submit', this.AddForm.value);
    console.log('Added successfully');
    this.service.postEmergenycContacts(this.AddForm.value).subscribe(
      (res) => {
        this.service.refreshList();
    this.toastr.success('Added successfully', 'Emergency Contact Register');
      },
      (err: any) => {
        console.log(err);
      }
    );
      } else {
        Object.values(this.AddForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        this.toastr.error('Not Added!');
      }


  }
  onSelectCountry() {
    if (this.EForm.value.country !== '') {
      this._locationPhoneService
        .getListofStates(this.EForm.value.country)
        .subscribe((response: string[]) => {
          this.listOfStates = response;
        });
    } else {
      this.listOfStates = [];
    }
    if (this.EForm.value.country === 'Ethiopia') {
      this.isEthiopia = true;
    } else {
      this.isEthiopia = false;
    }
  }

  checkPhone = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      console.log('Empty!');
      return { required: true };
    }

    const phone: string = control.value;
    const digits_only = (value: string) =>
      [...value].every((c) => '0123456789'.includes(c));
    if (!digits_only(phone)) {
      console.log('Not a number!');
      return { confirm: true, error: true };
    } else if (phone.length < 6 || phone.length > 12) {
      console.log('Exceeds length!');
      return { confirm: true, error: true };
    }
    return {};
  };
}
