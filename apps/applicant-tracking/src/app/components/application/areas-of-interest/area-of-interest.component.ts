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
    PositionName: 'Programmer',
    ProficiencyLevel: 'Senior II',
    Experience: '4 Years and 5 Months',
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
    this.isModalVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isModalVisible = false;
  }
  

  isNotSelected(selectedSkillSet: string[], value: string): boolean {
    return selectedSkillSet.indexOf(value) === -1;
  }

}
