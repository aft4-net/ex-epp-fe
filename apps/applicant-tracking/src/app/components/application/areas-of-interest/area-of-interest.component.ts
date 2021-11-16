
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


import { ApplicantGeneralInfoService } from '../../../services/applicant/applicant-general-info.service';
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
  isUpdateMode = false;
  isRecordUpdated = false;
  selectedRecord:number | undefined;

  areaOfInterest = new FormGroup({
    positionApplied: new FormControl('',[Validators.required]),
    proficiencyLevel: new FormControl('',[Validators.required]),
    primarySkills: new FormControl([], Validators.required),
    secondarySkills: new FormControl([]),
    otherSkills: new FormControl([]),
    yearOfExperience: new FormControl(0,[this.validator.validateYearOfExperience(),Validators.required]),
    monthsOfExperience: new FormControl(0,[this.validator.validateMonthsOfExperience(),Validators.required,]),
  });

  public validation = new FormGroup({
    isMultitpleEntry: new FormControl(false, [Validators.required]),
  });

  public listOfPositions: Array<any> = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Data Scientist" },
    { id: 3, name: "Scrum Master" },
    { id: 4, name: "Project Manager" },
    { id: 5, name: "Tech Lead" },
    { id: 6, name: "HR Manager" }
  ];

  proficiencyLevels = ["Programmer Intern","Associate Software Engineer", "Software Engineer", "Senior Software Engineer", "Associate Technical Lead" ]
  
  public listOfSkills: Array<any> = [];
 
  maxPrimarySkillSelection = 3;
  maxSecondarySkillSelection = 5;
  maxOtherSkillSelection = 10;

  selectedSoFar = [];
  appliedSoFar: Array<any>  = [];

  loading = false;



  areaOfInterests = [{
    Id: 1,
    PositionName: 2,
    ProficiencyLevel: 'Senior II',
    YearsOfExperience: 2,
    MonthsOfExperience: 5,
    PrimarySkillSet: ["Agile Methodology","CSS"],
    SecondarySkillSet: ["User Stories","Forecasting"],
    OtherSkillSet: ["UXDesign","Forecasting", "Communication"],
  }];

  constructor(private personalInfoService: ApplicantGeneralInfoService, private router: Router,
    private notification: NotificationBar, private validator: FormValidator) {}

  ngOnInit(): void {
    this.personalInfoService.appliedToPositions().subscribe(res => {
      this.appliedSoFar = res.map(o => o.positionId);
      console.log(this.appliedSoFar);
    });
    this.areaOfInterest.controls.primarySkills.valueChanges.subscribe((value)=>{
      this.selectedSoFar = [];
      this.selectedSoFar = this.selectedSoFar.concat(this.areaOfInterest.controls.primarySkills.value, this.areaOfInterest.controls.secondarySkills.value, this.areaOfInterest.controls.otherSkills.value);
    });

    this.areaOfInterest.controls.secondarySkills.valueChanges.subscribe((value)=>{
      this.selectedSoFar = [];
      this.selectedSoFar = this.selectedSoFar.concat(this.areaOfInterest.controls.primarySkills.value, this.areaOfInterest.controls.secondarySkills.value, this.areaOfInterest.controls.otherSkills.value);
    });

    this.areaOfInterest.controls.otherSkills.valueChanges.subscribe((value)=>{
      this.selectedSoFar = [];
      this.selectedSoFar = this.selectedSoFar.concat(this.areaOfInterest.controls.primarySkills.value, this.areaOfInterest.controls.secondarySkills.value, this.areaOfInterest.controls.otherSkills.value);
    });

    this.areaOfInterest.controls.positionApplied.valueChanges.subscribe(value => {
        this.areaOfInterest.controls.primarySkills.setValue([]);
        this.areaOfInterest.controls.secondarySkills.setValue([]);
        this.areaOfInterest.controls.otherSkills.setValue([]);
        this.personalInfoService.getSkills()
        .subscribe(res=>{
          console.log(res);
          this.listOfSkills = res;
        }, error =>{
          console.log(error);
        });
      

      console.log('position has changed:', value);
      
      console.log(this.listOfSkills);
 });
  }


  onAddNewClick(): void {
    this.resetForm();
    this.isModalVisible = true;
    this.isUpdateMode = false;
  }

  onSaveRecord(): void {
    console.log('Button ok clicked!');
    this.loading = true;

    const newItem = Object.assign({}, this.areaOfInterests[0]); 
    newItem.Id = newItem.Id + Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    newItem.PositionName = this.areaOfInterest.get('positionApplied')?.value;
    newItem.ProficiencyLevel = this.areaOfInterest.get('proficiencyLevel')?.value;
    newItem.PrimarySkillSet = this.areaOfInterest.get('primarySkills')?.value;
    newItem.SecondarySkillSet = this.areaOfInterest.get('secondarySkills')?.value;
    newItem.OtherSkillSet = this.areaOfInterest.get('otherSkills')?.value;
    newItem.YearsOfExperience = this.areaOfInterest.get('yearOfExperience')?.value;
    newItem.MonthsOfExperience = this.areaOfInterest.get('monthsOfExperience')?.value;
    this.areaOfInterests.push(newItem);
    this.loading = false;
    

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
  onUpdateRecord(id:number){
    this.loading = true;
    const selectedItem = this.areaOfInterests.filter(a => a.Id == id);
    selectedItem[0].PositionName = this.areaOfInterest.controls.positionApplied.value;
    selectedItem[0].ProficiencyLevel = this.areaOfInterest.controls.proficiencyLevel.value;
    selectedItem[0].PrimarySkillSet = this.areaOfInterest.controls.primarySkills.value;
    selectedItem[0].SecondarySkillSet = this.areaOfInterest.controls.secondarySkills.value;
    selectedItem[0].OtherSkillSet = this.areaOfInterest.controls.otherSkills.value;
    selectedItem[0].YearsOfExperience = this.areaOfInterest.controls.yearOfExperience.value;
    selectedItem[0].MonthsOfExperience = this.areaOfInterest.controls.monthsOfExperience.value;
    this.loading = false;
    this.isModalVisible = false;
    this.isRecordUpdated = true;
    
  }
  onFormSubmit()
  {
    this.onSaveRecord();
    this.isModalVisible = false;
    this.personalInfoService.setRoutInfo('/application/education');
    this.router.navigate(['/application/education']);
  }

  onEditRecord(id: number) {
    console.log(id);
    this.isModalVisible = true;
    this.isUpdateMode = true;
    this.selectedRecord = id;
    const selectedItem = this.areaOfInterests.filter(a => a.Id == id);
    console.log(selectedItem);
    this.areaOfInterest.controls.positionApplied.setValue(selectedItem[0].PositionName);
    this.areaOfInterest.controls.proficiencyLevel.setValue(selectedItem[0].ProficiencyLevel); 
    this.areaOfInterest.controls.primarySkills.setValue(selectedItem[0].PrimarySkillSet);
    this.areaOfInterest.controls.secondarySkills.setValue(selectedItem[0].SecondarySkillSet);
    this.areaOfInterest.controls.otherSkills.setValue(selectedItem[0].OtherSkillSet);
    this.areaOfInterest.controls.yearOfExperience.setValue(selectedItem[0].YearsOfExperience);
    this.areaOfInterest.controls.monthsOfExperience.setValue(selectedItem[0].MonthsOfExperience);
   }

   resetForm(){
    this.areaOfInterest.reset();
    this.listOfSkills = [];
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isModalVisible = false;
  }

  getPositionName(value:number){
    const returnValue = this.listOfPositions.filter(x => x.id === value);
    return returnValue[0].name;
  }

  onDeleteRecord(id: number) {
    this.areaOfInterests = this.areaOfInterests.filter(a => a.Id !== id);
  }
}
