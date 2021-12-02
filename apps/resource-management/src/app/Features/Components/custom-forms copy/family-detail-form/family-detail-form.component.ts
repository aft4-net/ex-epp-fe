import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { FormErrorMessage } from '../accessories/models-types';
import { setControlError } from '../accessories/functions';

@Component({
  selector: 'exec-epp-family-detail-form',
  templateUrl: './family-detail-form.component.html',
  styleUrls: ['./family-detail-form.component.scss']
})
export class FamilyDetailFormComponent implements OnInit {

  errorMessages = {
    ...{} as FormErrorMessage,
    ...{
      controls: {
        relationship: setControlError(true),
        firstName: setControlError(true),
        middleName: setControlError(true),
        lastName: setControlError(true),
        gender: setControlError(true),
        dateofBirth: setControlError(true),
        remark: setControlError(true),
      }
    } as Partial<FormErrorMessage>
  } as FormErrorMessage

  familyDetailForm: FormGroup

  constructor(
    private readonly _formBuilder: FormBuilder
  ) {
    this.familyDetailForm = this.createForm()
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    return this._formBuilder.group({
      relationship: [null],
      firstName: [null],
      middleName: [null],
      lastName: [null],
      gender: [null],
      dateofBirth: [null],
      remark: [null],
    })
  }

  validateRelationship() { }

  validateName(type: string) { }

  validateGender() { }

  validateDateofBirth() { }

  validateRemark() { }




  // It is put for the purpose of testing to make the component visible in routing
  // For other please, set the value to false
  // @Input() isStandalone = false

  // relationships: Relationship[] = []
  // employees:FamilyDetail[]=[]
  // buttonClicked = 0
  // isnotMarried=0
  // isRelationShipRequired = true;
  // isFullNameRequired=true;
  // isGenderRequired=true;
  // isDoBRequired=true;
  // isRemarkRequired =true;
  // familydetails:FamilyDetail[]=[]
  // validateForm!: FormGroup;
  // @Output() result: EventEmitter<{type: string, familydetails: FamilyDetail[]}> = new EventEmitter<{type: string, familydetails: FamilyDetail[]}>()

  // constructor(
  //   private fb: FormBuilder
  // ) {
  //   this._familyDetailService.getListofEmpIds()
  //       .subscribe((response: FamilyDetail[]) => {
  //         this.employees = response

  //       });
  //   this.relationships = []

  //   this.validateForm = this.fb.group({
  //     maritalStatus: new FormControl([null, [Validators.required]]),
  //     relationship: [null, [Validators.required]],
  //     remark: [null, ],
  //     fullName: [null, [this.validateName,Validators.required]],
  //     gender: [null, [Validators.required]],
  //     dateofBirth: [null, [Validators.required]],
  //    });
  // }
  // getRelationShipName(value:any){
  //   const result = this.relationships.find(obj => {
  //     return obj.Guid === value;
  //   })
  //   return result?.Name;
  // }

  // ngOnInit(): void {

  //   this.validateForm.controls.fullName.valueChanges.subscribe(() => {
  //     this.validateForm.controls.fullName.setValidators([
  //       this.validateName(),
  //       Validators.required,
  //     ]);
  //   });
  //   this.validateForm.controls.maritalStatus.valueChanges.subscribe((value)=>{
  //     if(value==="Not Married"){
  //       this.isRelationShipRequired = false;
  //       this.isFullNameRequired=false;
  //       this.isGenderRequired=false;
  //       this.isDoBRequired=false;
  //     }
  //     else
  //     {
  //       this.isRelationShipRequired = true;
  //       this.isFullNameRequired=true;
  //       this.isGenderRequired=true;
  //       this.isDoBRequired=true;

  //     }
  //   });
  //   this.validateForm.controls.relationship.valueChanges.subscribe((value)=>{
  //     const value2 = this.getRelationShipName(value);
  //     if(value2==="Child"){

  //       this.isFullNameRequired=true;
  //       this.isGenderRequired=true;
  //       this.isDoBRequired=true;

  //     }
  //       else if(value2==="Spouse"){
  //         this.isRelationShipRequired = true;
  //         this.isFullNameRequired=true;
  //         this.isGenderRequired=false;
  //         this.isDoBRequired=false;
  //       }
  //       else if(value2==="Mother"){
  //         this.isRelationShipRequired = true;
  //         this.isFullNameRequired=true;
  //         this.isGenderRequired=false;
  //         this.isDoBRequired=false;
  //       }
  //       else if(value2==="Other"){
  //         this.isRelationShipRequired = true;
  //         this.isFullNameRequired=true;
  //         this.isGenderRequired=false;
  //         this.isDoBRequired=false;

  //       }
  //       else if(value2==="Father"){
  //         this.isRelationShipRequired = true;
  //         this.isFullNameRequired=true;
  //         this.isGenderRequired=false;
  //         this.isDoBRequired=false;
  //       }

  //   });
  // }

  // onSelectMaritalStatus() {
  //     this._relationshipService.getListofRelationships(this.validateForm.value.maritalStatus)
  //       .subscribe((response: Relationship[]) => {
  //         this.relationships = response
  //       });
  //       if (this.validateForm.value.maritalStatus==="Not Married")
  //       {
  //         this.isnotMarried=1;
  //       }
  //   }
  //   validateName(): ValidatorFn {
  //     return (control: AbstractControl): ValidationErrors | null => {
  //       const name = control.value;
  //       const isValid = name.match('^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$') && name.length >= 2;
  //       return !isValid ? { value: control.value } : null;
  //     };
  //   }
  //   onAction(event: string) {


  //     if (event === 'back') {
  //       this._employeeService.setEmployeeData(
  //         {
  //           FamilyDetail: this.familydetails
  //         }
  //       )
  //       this._router.navigateByUrl('/Organization-Detail')
  //     }
  //     else {
  //       console.log(event)

  //       if (this.validateForm.valid) {
  //         const familydetail = {
  //           RelationshipId: this.validateForm.value.relationship,
  //           FullName: this.validateForm.value.fullName,
  //           Gender: this.validateForm.value.gender,
  //           DateofBirth: this.validateForm.value.dateofBirth,
  //           EmployeeId: this.validateForm.value.employeeId,
  //           Remark:this.validateForm.value.remark

  //         } as FamilyDetail

  //         this.familydetails = [
  //           ...this.familydetails,
  //           familydetail
  //         ]

  //         console.log(this.familydetails)

  //         if (event === 'submit') {
  //           this.validateForm = this.fb.group({
  //             maritalStatus: [null, [Validators.required]],
  //             relationship: [null, [Validators.required]],
  //             fullName: [null, [Validators.required]],
  //             gender: [null, [Validators.required]],
  //             dateoBirth: [null],
  //             remark: [null]

  //           });
  //           console.log(this.familydetails)
  //         }
  //         else {
  //           this._employeeService.setEmployeeData(
  //             {
  //               FamilyDetail: this.familydetails
  //             }
  //           )
  //           this._router.navigateByUrl('/emergency-contact')
  //         }
  //       } else {
  //         Object.values(this.validateForm.controls).forEach(control => {
  //           if (control.invalid) {
  //             control.markAsDirty();
  //             control.updateValueAndValidity({ onlySelf: true });
  //           }
  //         });
  //       }

  //     }

  //   }

  //   disabledDate = (startValue: Date): boolean => {
  //       return startValue.getTime() > Date.now();
  //   };


}
