import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantGeneralInfoService } from '../../../services/applicant/applicant-general-info.service';
import { NotificationBar } from '../../../utils/feedbacks/notification';

@Component({
  selector: 'area-of-interest',
  templateUrl: './area-of-interest.component.html',
  styleUrls: ['./area-of-interest.component.scss']
})
export class AreaOfInterestComponent implements OnInit {
  isModalVisible = false;
  isMultitpleEntry = false;
  isUpdateMode = false;
  isRecordUpdated = false;
  positions = ['Scrum Master', 'Developer', 'Product Owner', 'Quality Assurance'];
  proficiencyLevels = ["Programmer Intern","Associate Software Engineer", "Software Engineer", "Senior Software Engineer", "Associate Technical Lead" ]
  skillSets = ["Agile Methodology", "Html", "CSS", "User stories", "Forecasting", "UXDesign", "Figma" ]
  
  areaOfInterests = [{
    Id: 1,
    PositionName: 'Programmer',
    ProficiencyLevel: 'Senior II',
    Experience: '4 Years and 5 Months',
    PrimarySkillSet: ["Agile Methodology","CSS"],
    SecondarySkillSet: ["User Stories","Forecasting"],
    OtherSkillSet: ["UXDesign","Forecasting", "Communication"],
  }];
  selectedPosition = '';
  selectedProficiency = '';
  listOfSelectedPrimarySkillValue: string[] = [];
  listOfSelectedSecondarySkillValue: string[] = [];
  listOfSelectedOtherSkillValue: string[] = [];
  loading = false;

  
  constructor(private router: Router,
     private notification: NotificationBar,
     private applicantService: ApplicantGeneralInfoService
     ) { }

  ngOnInit(): void {
  }
  onAddNewClick(): void {
    this.isModalVisible = true;
    this.isUpdateMode = false;
  }

  onSaveRecord(): void {
    console.log('Button ok clicked!');
    this.loading = true;
    const newItem = Object.assign({}, this.areaOfInterests[0]); 
    newItem.Id = newItem.Id + 1;
    newItem.PositionName = this.selectedPosition;
    newItem.ProficiencyLevel = this.selectedProficiency;
    newItem.PrimarySkillSet = this.listOfSelectedPrimarySkillValue;
    newItem.SecondarySkillSet = this.listOfSelectedSecondarySkillValue;
    newItem.OtherSkillSet = this.listOfSelectedOtherSkillValue;
  
    this.areaOfInterests.push(newItem);
    this.loading = false;
    this.isModalVisible = this.isMultitpleEntry; 

    this.notification.showNotification({
          type: 'success',
          content: 'You have successfully added the application',
          duration: 5000,
        });
   this.isRecordUpdated = true;

  }
  onFormSubmit()
  {
    this.onSaveRecord();
    this.isModalVisible = false;
    this.applicantService.setRoutInfo('/application/education');
    this.router.navigate(['/application/education']);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isModalVisible = false;
  }

  isNotSelected(selectedSkillSet: string[], value: string): boolean {
    return selectedSkillSet.indexOf(value) === -1;
  }
  onEditRecord(id: number) {
   this.isModalVisible = true;
   this.isUpdateMode = true;
   const selectedItem = this.areaOfInterests.filter(a => a.Id == id);
   this.selectedPosition = selectedItem[0].PositionName;
   this.selectedProficiency = selectedItem[0].ProficiencyLevel;
   this.listOfSelectedPrimarySkillValue = selectedItem[0].PrimarySkillSet;
   this.listOfSelectedSecondarySkillValue = selectedItem[0].SecondarySkillSet;
   this.listOfSelectedOtherSkillValue = selectedItem[0].SecondarySkillSet;
  }
  onDeleteRecord(id: number) {
    this.areaOfInterests = this.areaOfInterests.filter(a => a.Id !== id);
  }
}
