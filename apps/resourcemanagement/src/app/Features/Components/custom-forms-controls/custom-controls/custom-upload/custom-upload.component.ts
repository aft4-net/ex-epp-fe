import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "libs/environments/environment";
import { EmployeeService } from "../../../../Services/Employee/EmployeeService";
import { Router } from "@angular/router";


const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
@Component({
    selector: 'exec-epp-custom-upload',
    templateUrl: './custom-upload.component.html',
    styleUrls: ['./custom-upload.component.scss']
  })
export class CustomUploadComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    @Input() label = 'Label'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true

    @Input() formGroup: FormGroup = new FormGroup({})
    
    fileList: NzUploadFile[] = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: '../../../../../../assets/images/Ellipse.png'
      }
    ];
    previewImage: string | undefined = '';
    previewVisible = false;
    errMessage = '';
    file: File | undefined ; 
    employeeguid= "";   
    userEmail=window.sessionStorage.getItem('username')+'';
    empImg : any;
    removeImg = true;

    constructor(private http: HttpClient, private _employeeService : EmployeeService,private _router: Router) {
    }

    ngOnInit(): void {
      if(this._employeeService.empNum === 'ec0001'){
        this.empImg = null;
      }
     
     console.log("this was the email on init "+ this.userEmail + " and EmpNum " + this._employeeService.empNum);
      this.getUser(this.userEmail);
      this.getUserImg(this._employeeService.empNum);
    }

    
    handlePreview = async (file: NzUploadFile): Promise<void> => {
      // alert("yes");
      // if (!file.url && !file.preview) {
      //   file.preview = await getBase64(file.originFileObj!);
      // }
      // this.previewImage = file.url || file.preview;
      // this.previewVisible = true;
    };
 
    customUploadReq = (item: any) => {
      
      const formData = new FormData();
      formData.append('data', item.file as any); // tslint:disable-next-line:no-any
      console.log("on it 2 " + item.file.name);
      formData.append('id', this._employeeService.empNum);
    //  const req = new HttpRequest('POST', 'http://localhost:14696/api/v1/EmployeePhoto', formData);
      // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
     return this.http.post(environment.apiUrl+'/EmployeePhoto',formData).subscribe((event: any) => {
       console.log("on it");
       item.status= 'done';
       console.log(event.Data);
      },(err) => { /* error */
        console.log(err);
      },
      ()=>{
        this._router.navigate(['resourcemanagement']);
        console.log("completed");
      });
     
    }
    getUser(email:string){
      return this.http.get<any>(environment.apiUrl+'/Employee/GetEmployeeSelectionByEmail?employeeEmail=' 
      + email.toLowerCase()).subscribe((response:any)=>{
        this.employeeguid = response.EmployeeNumber;
      });
     }

     getUserImg(empNumber:string){
      return this.http.get<any>(environment.apiUrl+'/EmployeePhoto?id=' 
      + empNumber).subscribe((response:any)=>{
        this.empImg = response.Data;
        console.log("this is it "+ this.empImg);
        if(this.empImg == null){
          this.removeImg = false;
        }
      });
     }
    

    onChange(event:any) {
      this.file = event.target.files[0];
      this.errMessage = commonErrorMessage.message.substring(0)
    }

    upload(file:any) {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("data", file, file.name);
        
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "multipart/form-data",
          'Accept': 'text/plain',
        })
      };
      console.log("right on call ");
      // Make http post request over api
      // with formData as req
       this.http.post('http://localhost:14696/api/v1/EmployeePhoto', formData).subscribe(
        (result) =>{
         return result;
        } 
      );
  }
   // OnClick of button Upload
   onUpload() {
   // this.loading = !this.loading;
    console.log(this.file);
   this.upload(this.file);
}

}