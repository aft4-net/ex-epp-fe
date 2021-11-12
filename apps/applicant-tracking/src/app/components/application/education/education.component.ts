import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'exec-epp-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  loggedInUser: any;
  isModalVisible = false;
  
  public education = new FormGroup({
    inistitution: new FormControl('', [Validators.required]),
    yearFrom: new FormControl(null, [Validators.required]),
    yearTo: new FormControl(null, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    program: new FormControl('', [Validators.required]),
    fieldOfStudy: new FormControl('', [Validators.required]),
  });

  closeModal(){
    this.isModalVisible = false;
  }
  openModal(){
    this.isModalVisible = true;
  }
}
