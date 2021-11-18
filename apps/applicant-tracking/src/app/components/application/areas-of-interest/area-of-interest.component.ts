
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { areaOfInterestModel } from '../../../models/applicant/areaOfInterest/area-of-interest.model';
import { LUPositionToApply } from '../../../models/applicant/areaOfInterest/positions-to-apply.model';
import { LUProficiencyLevel } from '../../../models/applicant/areaOfInterest/proficiency-level.model';
import { LUSkillSet } from '../../../models/applicant/areaOfInterest/skill-sets.model';
import { AreaOfInterestLookUpService } from '../../../services/applicant/area-of-interest-look-up.service';
import { AreasOfInterestService } from '../../../services/applicant/areas-of-interest.service';


import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormValidator } from '../../../utils/validator';

@Component({
  selector: 'area-of-interest',
  templateUrl: './area-of-interest.component.html',
  styleUrls: ['./area-of-interest.component.scss']
})
export class AreaOfInterestComponent implements OnInit {
  isModalVisible = false;
  selectedPositionId = 0;
  //isMultitpleEntry = false;
  isUpdateMode = false;
  isRecordUpdated = false;
  selectedRecord:string | undefined;
  
  loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUserInfo') ?? ''
  );
    
  areaOfInterest = new FormGroup({
    PositionToApplyID: new FormControl('',[Validators.required]),
    ProficiencyLevelID: new FormControl('',[Validators.required]),
    SelectedIDArray: new FormControl([], Validators.required),
    SelectedIDSecondArray: new FormControl([]),
    SelectedIDOtherArray: new FormControl([]),
    YearsOfExpierence: new FormControl('',[this.validator.validateYearOfExperience(),Validators.required]),
    MonthOfExpierence: new FormControl('',[this.validator.validateMonthsOfExperience(),Validators.required]),
    ApplicantId: new FormControl(this.loggedInUser.Guid)
  });

  public validation = new FormGroup({
    isMultitpleEntry: new FormControl(false, [Validators.required]),
  });

  public listOfPositions:[LUPositionToApply] | [] = [];
  public proficiencyLevels : [LUProficiencyLevel] | [] = [];
  public listOfSkills: [LUSkillSet] | [] = [];
  public areaOfInterests: [areaOfInterestModel] | [] = [];

  maxPrimarySkillSelection = 3;
  maxSecondarySkillSelection = 5;
  maxOtherSkillSelection = 10;

  selectedSoFar = [];
  appliedSoFar: Array<any>  = [];

  loading = false;

  getAllPositionsToApply(){
    this.areaOfInterestLookUpService.getAllPositions().subscribe(res => {
      this.listOfPositions = res.Data;
    });
  }

  getAllProficiencyLevels(){
    this.areaOfInterestLookUpService.getAllProficencyLevel().subscribe(res => {
      this.proficiencyLevels = res.Data;
    });
  }

  getAreaOfInterestByApplicantId(){
    this.aoiService.getApplicantAreaOfInterestByID(this.loggedInUser.Guid).subscribe(res =>{
      this.areaOfInterests = res.Data;
      this.appliedSoFar = this.areaOfInterests.map(o => o.PositionToApplyID);
    });
  }

  constructor(private aoiService: AreasOfInterestService, 
    private areaOfInterestLookUpService: AreaOfInterestLookUpService,
    private router: Router, private modal: NzModalService,
    private notification: NotificationBar, private validator: FormValidator) {}

    
  ngOnInit(): void {
    this.getAllPositionsToApply();
    this.getAllProficiencyLevels();
    this.getAreaOfInterestByApplicantId();

    this.areaOfInterestLookUpService.appliedToPositions().subscribe(res => {
      this.appliedSoFar = res.map(o => o.positionId);
    });

    this.areaOfInterest.controls.SelectedIDArray.valueChanges.subscribe((value)=>{
      this.selectedSoFar = [];
      this.selectedSoFar = this.selectedSoFar.concat(this.areaOfInterest.controls.SelectedIDArray.value, this.areaOfInterest.controls.SelectedIDSecondArray.value, this.areaOfInterest.controls.SelectedIDOtherArray.value);
    });

    this.areaOfInterest.controls.SelectedIDSecondArray.valueChanges.subscribe((value)=>{
      this.selectedSoFar = [];
      this.selectedSoFar = this.selectedSoFar.concat(this.areaOfInterest.controls.SelectedIDArray.value, this.areaOfInterest.controls.SelectedIDSecondArray.value, this.areaOfInterest.controls.SelectedIDOtherArray.value);
    });

    this.areaOfInterest.controls.SelectedIDOtherArray.valueChanges.subscribe((value)=>{
      this.selectedSoFar = [];
      this.selectedSoFar = this.selectedSoFar.concat(this.areaOfInterest.controls.SelectedIDArray.value, this.areaOfInterest.controls.SelectedIDSecondArray.value, this.areaOfInterest.controls.SelectedIDOtherArray.value);
    });

    this.areaOfInterest.controls.PositionToApplyID.valueChanges.subscribe(value => {
        this.areaOfInterest.controls.SelectedIDArray.setValue([]);
        this.areaOfInterest.controls.SelectedIDSecondArray.setValue([]);
        this.areaOfInterest.controls.SelectedIDOtherArray.setValue([]);
        this.areaOfInterestLookUpService.getSkillsByPosition(value)
        .subscribe(res=>{
          this.listOfSkills = res.Data;
        }, error =>{
          console.log(error);
        });
      

 });
  }


  onAddNewClick(): void {
    this.resetForm();
    this.isModalVisible = true;
    this.isUpdateMode = false;
  }

  onSaveRecord(): void {
    const dataToPost = this.areaOfInterest.value;
    dataToPost.ApplicantId = this.loggedInUser.Guid;

    this.aoiService.createApplicantAreaOfInterest(dataToPost).subscribe(
      () => {
        this.loading = false;
        this.notification.showNotification({
          type: 'success',
          content: 'Successfully Added Area of Interest.',
          duration: 5000,
        });
        this.getAreaOfInterestByApplicantId();
        this.aoiService.setRoutInfo('/application/area-of-interest');
        this.router.navigate(['/application/area-of-interest']);
      },
      (err: any) => {
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'Area of Interest not saved. Please try again',
          duration: 5000,
        });
        console.log('error:' + err);
      }
    );
        
    if (!this.validation.controls.isMultitpleEntry.value) {
      this.isModalVisible = false;
      this.notification.showNotification({
        type: 'success',
        content: 'You have successfully added the application',
        duration: 5000,
      });
      this.isRecordUpdated = true;
    }
    this.areaOfInterest.reset();
    this.validation.controls.isMultitpleEntry.setValue(false);
    this.isRecordUpdated = true;

  }

  onUpdateRecord(id:string){
    this.loading = true;
    const dataToPost = this.areaOfInterest.value;
    dataToPost.ApplicantId = this.loggedInUser.Guid;
    dataToPost.Guid =this.selectedRecord;

    this.aoiService.updateApplicantAreaOfInterest(dataToPost).subscribe(
      () => {
        this.loading = false;
        this.notification.showNotification({
          type: 'info',
          content: 'Successfully Updated Your Area of Interest.',
          duration: 5000,
        });
        this.getAreaOfInterestByApplicantId();
        this.aoiService.setRoutInfo('/application/area-of-interest');
        this.router.navigate(['/application/area-of-interest']);
      },
      (err: any) => {
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'Area of Interest Not Updated. Please try again',
          duration: 5000,
        });
        console.log('error:' + err);
      }
    );
    this.loading = false;
    this.isModalVisible = false;
    this.isRecordUpdated = true;
    
  }

  onFormSubmit()
  {
    this.onSaveRecord();
    this.isModalVisible = false;
    //this.areaOfInterestLookUpService.setRoutInfo('/application/education');
    this.router.navigate(['/application/education']);
  }

  onEditRecord(id: string) {
    this.isModalVisible = true;
    this.isUpdateMode = true;
    this.selectedRecord = id;
    const toUpdateRow = this.areaOfInterests.filter(x=>x.Guid === id)[0];
    this.areaOfInterest.patchValue({
      Guid: toUpdateRow.Guid,
      PositionToApplyID: toUpdateRow.PositionToApplyID,
      ProficiencyLevelID: toUpdateRow.ProficiencyLevelID,
      SelectedIDArray: toUpdateRow.SelectedIDArray,
      SelectedIDSecondArray: toUpdateRow.SelectedIDSecondArray, 
      SelectedIDOtherArray: toUpdateRow.SelectedIDOtherArray, 
      YearsOfExpierence: toUpdateRow.YearsOfExpierence,
      MonthOfExpierence: toUpdateRow.MonthOfExpierence,
    });
   }

   resetForm(){
    this.areaOfInterest.reset();
    this.listOfSkills = [];
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  getPositionName(value:any){
    const result = this.listOfPositions.find(obj => {
      return obj.Guid === value;
    })
    return result?.Name;
  }

  getProficiencyName(value:any){
    const result = this.proficiencyLevels.find(obj => {
      return obj.Guid === value;
    })
    return result?.Name;
  }

  onDeleteRecord(id: string) {
    this.showConfirmation(id);
  }
  showConfirmation(guid: string | null): void {
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete this Area of Interest?',
      nzOnOk: () => {
        this.deleteItem(guid);
      },

    });
  }
  deleteItem(guid: string | null) {
    const id = guid ? guid : '';
    this.aoiService.deleteApplicantAreaOfInterest(id).subscribe(
      () => {
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'Successfully Deleted Area of Interest.',
          duration: 5000,
        });
        this.getAreaOfInterestByApplicantId();
        this.aoiService.setRoutInfo('/application/area-of-interest');
        this.router.navigate(['/application/area-of-interest']);
      },
      (err: any) => {
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'Area of Interest Not Deleted. Please try again',
          duration: 5000,
        });
        console.log('error:' + err);
      }
    );
  }
}