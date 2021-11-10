import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'area-of-interest',
  templateUrl: './area-of-interest.component.html',
  styleUrls: ['./area-of-interest.component.scss']
})
export class AreaOfInterestComponent implements OnInit {
  isModalVisible = false;
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
  listOfSelectedValue: string[] = [];
  listOfSelectedPrimarySkillValue: string[] = [];
  listOfSelectedSecondarySkillValue: string[] = [];
  listOfSelectedOtherSkillValue: string[] = [];
  loading = false;

  
  constructor() { }

  ngOnInit(): void {
  }
  onShowModal(): void {
    this.isModalVisible = true;
  }

  onFormSubmit(): void {
    console.log('Button ok clicked!');
    this.loading = true;
    
    this.areaOfInterests.push(...this.areaOfInterests);
    this.loading = false;
    this.isModalVisible = false;


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
   const selectedItem = this.areaOfInterests.filter(a => a.Id == id);
   this.listOfSelectedValue = [selectedItem[0].PositionName];
   this.listOfSelectedPrimarySkillValue = selectedItem[0].PrimarySkillSet;
   this.listOfSelectedSecondarySkillValue = selectedItem[0].SecondarySkillSet;
   this.listOfSelectedOtherSkillValue = selectedItem[0].SecondarySkillSet;
  }
  onDeleteRecord(id: number) {
    this.areaOfInterests = this.areaOfInterests.filter(a => a.Id !== id);
  }

}
