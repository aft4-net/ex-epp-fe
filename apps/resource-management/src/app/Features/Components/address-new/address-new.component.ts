import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.scss']
})
export class AddressNewComponent implements OnInit {

  coutries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Bolivia', 'Botswana', 'Brazil', 'Bulgaria',
    'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica',
    'Croatia', 'Cuba', 'Czech Republic', 'Denmark', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'England', 'Estonia', 'Ethiopia',
    'Fiji', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kenya',
    'Kuwait', 'Laos', 'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Madagascar',
    'Malaysia', 'Mali', 'Malta', 'Mexico', 'Mongolia', 'Morocco', 'Mozambique',
    'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria',
    'Norway', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland',
    'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Scotland', 'Senegal',
    'Serbia', 'Singapore', 'Slovakia', 'South Africa', 'South Korea', 'Spain',
    'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
    'Thailand', 'Tonga', 'Tunisia', 'Turkey', 'Ukraine', 'United Arab Emirates',
    '(The) United Kingdom', '(The) United States', 'Uruguay', 'Venezuela',
    'Vietnam', 'Wales', 'Zambia', 'Zimbabwe'
  ]

  usStates = [
    ' Alabama',
    ' Alaska', ' Arizona', ' Arkansas', ' California',
    ' Colorado', ' Connecticut', ' Delaware', ' Florida',
    ' Georgia', ' Hawaii', ' Idaho', ' Illinois',
    ' Indiana', ' Iowa', ' Kansas', ' Kentucky[D]',
    ' Louisiana', ' Maine', ' Maryland', ' Massachusetts[D]',
    ' Michigan', ' Minnesota', ' Mississippi', ' Missouri',
    ' Montana', ' Nebraska', ' Nevada', ' New Hampshire',
    ' New Jersey', ' New Mexico', ' New York', ' North Carolina',
    ' North Dakota', ' Ohio', ' Oklahoma', ' Oregon',
    ' Pennsylvania[D]', ' Rhode Island', ' South Carolina', ' South Dakota',
    ' Tennessee', ' Texas', ' Utah', ' Vermont',
    ' Virginia[D]', ' Washington', ' West Virginia', ' Wisconsin',
    ' Wyoming'
  ]

  etStates = [
    'Addis Ababa (city)',
    'Afar Region', 'Amhara Region', 'Benishangul-Gumuz Region', 'Dire Dawa (city)',
    'Gambela Region', 'Harari Region', 'Oromia Region', 'Sidama Region',
    'Somali Region', 'Southern Nations, Nationalities, and Peoples Region', 'Tigray Region'
  ]

  listofCodes = ['+1','+7',
  '+20','+27','+30','+31',
  '+32','+33','+34','+36',
  '+39','+40','+41','+43',
  '+44','+45','+46','+47','+48','+49','+51',
  '+52','+53','+54','+55',
  '+56','+57','+58','+60',
  '+61','+62',
  '+63','+64','+65',
  '+66','+81','+82','+84',
  '+86','+90','+91','+92',
  '+93','+94','+95','+98',
  '+211','+212','+213',
  '+216','+218','+220','+221',
  '+222','+223','+224','+225',
  '+226','+227','+228','+229',
  '+230','+231','+232','+233',
  '+234','+235','+236','+237',
  '+238','+239','+240','+241',
  '+242','+243','+244','+245',
  '+246','+248','+249','+250',
  '+251','+252','+253','+254',
  '+255','+256','+257','+258',
  '+260','+261','+262',
  '+263','+264','+265','+266',
  '+267','+268','+269','+290',
  '+291','+297','+298','+299',
  '+350','+351','+352','+353',
  '+354','+355','+356','+357',
  '+358','+359','+370','+371',
  '+372','+373','+374','+375',
  '+376','+377','+378','+379',
  '+380','+381','+382','+383',
  '+385','+386','+387','+389',
  '+420','+421','+423','+500',
  '+501','+502','+503','+504',
  '+505','+506','+507','+508',
  '+509','+590','+591',
  '+592','+593','+595','+597',
  '+598','+599','+670',
  '+672','+673','+674','+675',
  '+676','+677','+678','+679',
  '+680','+681','+682','+683',
  '+685','+686','+687','+688',
  '+689','+690','+691','+692',
  '+850','+852','+853','+855',
  '+856','+880','+886','+960',
  '+961','+962','+963','+964',
  '+965','+966','+967','+968',
  '+970','+971','+972','+973',
  '+974','+975','+976','+977',
  '+992','+993','+994','+995',
  '+996','+998']

  listOfStates: string[] = []

  isEthiopia = false;

  buttonClicked: number = 0


  validateForm!: FormGroup;

  @Output() result: EventEmitter<any> = new EventEmitter<any>()



  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      subCityZone: [null, [Validators.required]],
      woreda: [null],
      houseNumber: [null],
      postalCode: [null],
      phoneNumberPrefix: ['+251'],
      residencialPhoneNumber: [null, [Validators.required]]
    });
  }

  onSelectCountry(){
    if(this.validateForm.value.country === '(The) United States'){
      this.listOfStates = this.usStates
      this.isEthiopia = false
    }
    else if(this.validateForm.value.country === 'Ethiopia'){
      this.listOfStates = this.etStates
      this.isEthiopia = true
    }
    else{
      this.listOfStates = []
      this.isEthiopia = false
    }
  }

  
  save(): void {
    if(this.buttonClicked === -1){
      console.log('Going back...')
      // route back
    }
    else{
      if (this.validateForm.valid) {
        this.result.emit(this.validateForm.value)
        if(this.buttonClicked === 0){
          console.log('New form')
        }
        else{
          console.log('Going forward...')
        }
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
    
  }
  
  onSubmit(): void{
    this.buttonClicked = 0
    console.log("Save")
    this.save()
  }

  onNext(){
    this.buttonClicked = 1
    console.log("Next")
    this.save()
  }

  onBack(){
    this.buttonClicked = -1
    console.log("Back")
    this.save()
  }

}
