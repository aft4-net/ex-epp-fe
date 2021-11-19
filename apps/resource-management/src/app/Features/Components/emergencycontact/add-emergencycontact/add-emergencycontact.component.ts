import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { LocationPhoneService } from '../../../Services/address/location-phone.service';

@Component({
  selector: 'exec-epp-add-emergencycontact',
  templateUrl: './add-emergencycontact.component.html',
  styleUrls: ['./add-emergencycontact.component.scss'],
})
export class AddEmergencycontactComponent implements OnInit {
  listOfStates: string[] = [];
  isEthiopia = false;
  EForm!: FormGroup;
  private _locationPhoneService!: LocationPhoneService;
  constructor(private fb: FormBuilder) {}
  listofCodes: string[] = [];
  countries: string[] = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Argentina',
    'Australia',
    'Austria',
    'Bangladesh',
    'Belgium',
    'Bolivia',
    'Botswana',
    'Brazil',
    'Bulgaria',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Chile',
    'China',
    'Colombia',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Czech Republic',
    'Denmark',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'England',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Germany',
    'Ghana',
    'Greece',
    'Guatemala',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kenya',
    'Kuwait',
    'Laos',
    'Latvia',
    'Lebanon',
    'Libya',
    'Lithuania',
    'Madagascar',
    'Malaysia',
    'Mali',
    'Malta',
    'Mexico',
    'Mongolia',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Nigeria',
    'Norway',
    'Pakistan',
    'Panama',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'Saudi Arabia',
    'Scotland',
    'Senegal',
    'Serbia',
    'Singapore',
    'Slovakia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Thailand',
    'Tonga',
    'Tunisia',
    'Turkey',
    'Ukraine',
    'United Arab Emirates',
    '(The) United Kingdom',
    '(The) United States',
    'Uruguay',
    'Venezuela',
    'Vietnam',
    'Wales',
    'Zambia',
    'Zimbabwe',
  ];

  usStates = [
    ' Alabama',
    ' Alaska',
    ' Arizona',
    ' Arkansas',
    ' California',
    ' Colorado',
    ' Connecticut',
    ' Delaware',
    ' Florida',
    ' Georgia',
    ' Hawaii',
    ' Idaho',
    ' Illinois',
    ' Indiana',
    ' Iowa',
    ' Kansas',
    ' Kentucky[D]',
    ' Louisiana',
    ' Maine',
    ' Maryland',
    ' Massachusetts[D]',
    ' Michigan',
    ' Minnesota',
    ' Mississippi',
    ' Missouri',
    ' Montana',
    ' Nebraska',
    ' Nevada',
    ' New Hampshire',
    ' New Jersey',
    ' New Mexico',
    ' New York',
    ' North Carolina',
    ' North Dakota',
    ' Ohio',
    ' Oklahoma',
    ' Oregon',
    ' Pennsylvania[D]',
    ' Rhode Island',
    ' South Carolina',
    ' South Dakota',
    ' Tennessee',
    ' Texas',
    ' Utah',
    ' Vermont',
    ' Virginia[D]',
    ' Washington',
    ' West Virginia',
    ' Wisconsin',
    ' Wyoming',
  ];

  etStates = [
    'Addis Ababa (city)',
    'Afar Region',
    'Amhara Region',
    'Benishangul-Gumuz Region',
    'Dire Dawa (city)',
    'Gambela Region',
    'Harari Region',
    'Oromia Region',
    'Sidama Region',
    'Somali Region',
    'Southern Nations, Nationalities, and Peoples Region',
    'Tigray Region',
  ];

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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  panels = [
    {
      active: true,
      name: 'Add Address',
    },
  ];
}
