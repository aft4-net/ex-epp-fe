import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Relationship } from '../../Models/FamilyDetail/RelationshipModel';
import { RelationshipService } from '../../Services/FamilyDetails/relationship.service';
import { FamilydetailService } from '../../Services/FamilyDetails/familydetail.service';
import { FamilyDetail } from '../../Models/FamilyDetail/FamilyDetailModel';
@Component({
  selector: 'exec-epp-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.scss']
})
export class FamilyDetailComponent implements OnInit {
  // It is put for the purpose of testing to make the component visible in routing
  // For other please, set the value to false
  @Input() isStandalone = false

  relationships: Relationship[] = []
  employees:FamilyDetail[]=[]
  buttonClicked = 0
  isnotMarried=0
  isRelationShipRequired = true;
  isFullNameRequired=true;
  isGenderRequired=true;
  isDoBRequired=true;
  isRemark =true;
  empIdSelected = 0;


  validateForm!: FormGroup;
  @Output() result: EventEmitter<{type: string, familydetails: FamilyDetail[]}> = new EventEmitter<{type: string, familydetails: FamilyDetail[]}>()
  checkRemark = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      console.log('Empty!')
      return { required: true };
    }
    return {};
  };


  constructor(
    private fb: FormBuilder,
    private _relationshipService: RelationshipService,
    private _familyDetailService: FamilydetailService
  ) {
    this._familyDetailService.getListofEmpIds()
        .subscribe((response: FamilyDetail[]) => {
          this.employees = response
        });
    this.relationships = []
  }
  getRelationShipName(value:any){
    const result = this.relationships.find(obj => {
      return obj.Guid === value;
    })
    return result?.Name;
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      maritalStatus: [null, [Validators.required]],
      relationship: [null, [Validators.required]],
      remark: ["Other", [Validators.required, this.checkRemark]],
      fullName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      dateofBirth: [null],
      employeeId:[null]
    });

    this.validateForm.controls.maritalStatus.valueChanges.subscribe((value)=>{
      if(value==="Not Married"){
        this.isRelationShipRequired = false;
        this.isFullNameRequired=false;
        this.isGenderRequired=false;
        this.isDoBRequired=false;
      }
      else
      {
        this.isRelationShipRequired = true;
        this.isFullNameRequired=true;
        this.isGenderRequired=true;
        this.isDoBRequired=true;
      }
    });
    this.validateForm.controls.relationship.valueChanges.subscribe((value)=>{
      const value2 = this.getRelationShipName(value);
      if(value2==="Child"){

        this.isFullNameRequired=true;
        this.isGenderRequired=true;
        this.isDoBRequired=true;
      }
        else if(value2==="Spouse"){
          this.isRelationShipRequired = true;
          this.isFullNameRequired=true;
          this.isGenderRequired=false;
          this.isDoBRequired=false;
        }
        else if(value2==="Mother"){
          this.isRelationShipRequired = true;
          this.isFullNameRequired=true;
          this.isGenderRequired=false;
          this.isDoBRequired=false;
        }
        else if(value2==="Other"){
          this.isRelationShipRequired = true;
          this.isFullNameRequired=true;
          this.isGenderRequired=false;
          this.isDoBRequired=false;
        }
        else if(value2==="Father"){
          this.isRelationShipRequired = true;
          this.isFullNameRequired=true;
          this.isGenderRequired=false;
          this.isDoBRequired=false;
        }

    });
  }
  onSelectEmpId(){
    this.empIdSelected=1;
  }
  onSelectMaritalStatus() {
      this._relationshipService.getListofRelationships(this.validateForm.value.maritalStatus,this.validateForm.value.employeeId)
        .subscribe((response: Relationship[]) => {
          this.relationships = response
        });
        if (this.validateForm.value.maritalStatus==="Not Married")
        {
          this.isnotMarried=1;
        }
    }
    onDateFill()
    {
      const today=new Date()
      if(this.validateForm.value.dateofBirth>today)
      {
        this.validateForm = this.fb.group({
          dateofBirth: [null],
        });
      }
    }
    onAction(event: string){

      if (event === 'back') {
        this.result.emit({
          type: 'back',
          familydetails: []
        })
      }
      else {

        if (this.validateForm.valid) {
          if (event === 'submit') {
            this.validateForm = this.fb.group({
              maritalStatus: [null, [Validators.required]],
              relationship: [null, [Validators.required]],
              remark: ["Other", [Validators.required, this.checkRemark]],
              fullName: [null, [Validators.required]],
              gender: [null, [Validators.required]],
              dateofBirth: [null],
              employeeId:[null]
            });
          }
          else {
            this.result.emit({
              type: 'next',
              familydetails: [] //to be modified
            })
          }

      }
      else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
    }

    disabledDate = (startValue: Date): boolean => {
        return startValue.getTime() > Date.now();
    };


}
