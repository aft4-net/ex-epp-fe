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
  empIdSelected=0
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
  }
  onSelectEmpId(){
    this.empIdSelected=1;
  }
  onSelectMaritalStatus() {
      this._relationshipService.getListofRelationships(this.validateForm.value.maritalStatus,this.validateForm.value.employeeId)
        .subscribe((response: Relationship[]) => {
          this.relationships = response
        });
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


}
