import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { EmergencyContact } from '../../Models/emergencycontact';
import { ResponseDto } from '../../Models/response-dto.model';
import { EmergencycontactService } from '../../Services/emergencycontact/emergencycontact.service';

@Component({
  selector: 'exec-epp-add-emergencycontact',
  templateUrl: './add-emergencycontact.component.html',
  styleUrls: ['./add-emergencycontact.component.scss'],
})
export class AddEmergencycontactComponent implements OnInit {
  @Input() isStandalone = true;

  EForm!: FormGroup;
  AddresForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  emc!: EmergencyContact;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() result: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(
    public service: EmergencycontactService,
    private fb: FormBuilder
  ) {}

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

    this.emc = {
     Guid: '',
  IsActive : true,
  IsDeleted : true,
  CreatedDate : new Date(),
  CreatedbyUserGuid : '',
  FirstName : 'Simbo',
  FatherName :'Temesgen',
  Relationship : 'brother',
      Address: []

    



    };


  }

  onSubmit() {
    if (this.EForm.valid) {
      if (this.service.formData.Guid == null) this.insertRecord();
      else this.updateRecord();
      console.log('submit', this.EForm.value);
    } else {
      Object.values(this.EForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  insertRecord() {
    this.service.postEmergenycContact().subscribe(
      () => {
        this.resetForm();
        this.service.refreshList();
        // this.toastr.success('Submitted successfully', 'Payment Detail Register')
      },
      (err: unknown) => {
        console.log(err);
      }
    );
  }

  updateRecord() {
    this.service.putEmergencycontact().subscribe(
      () => {
        this.resetForm();
        this.service.refreshList();
        // this.toastr.info('Updated successfully', 'Payment Detail Register')
      },
      (err: unknown) => {
        console.log(err);
      }
    );
  }

  resetForm() {
    this.EForm.reset();
    this.service.formData = new EmergencyContact();
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

  onAction() {
    this.service.postEmergenycContacts().subscribe(
      () => {
        this.resetForm();
        this.service.refreshList();
        // this.toastr.success('Submitted successfully', 'Payment Detail Register')
      },
      (err: unknown) => {
        console.log(err);
      }
    );
  }
  addEmergencycontact() {
    console.log('Added Successfully');
    this.service.addEmergencycontact(this.emc);
  }
}
