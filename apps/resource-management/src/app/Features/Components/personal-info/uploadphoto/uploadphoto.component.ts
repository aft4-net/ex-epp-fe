import { Component } from '@angular/core';
import { EmpphotoService } from '../../../Services/Employee/empphoto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'exec-epp-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrls: ['./uploadphoto.component.scss']
})
export class UploadphotoComponent {

  fileName = "";
   formData: FormData = new FormData();

  constructor(private uploadphoto: EmpphotoService) { }



  onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        this.formData.append("thumbnail", file,"photo");

        console.log(this.formData);
        console.log(file);



    }
}
submit(){
  this.uploadphoto.uploadEmployeePhoto(this.formData);
  alert("photo uploaded");
}



}
