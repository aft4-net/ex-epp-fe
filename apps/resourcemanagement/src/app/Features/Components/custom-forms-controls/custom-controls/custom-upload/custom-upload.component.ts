import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../shared/custom.validators";
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, Observer, of } from "rxjs";
import { environment } from "./../../../../../../environments/environment";
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
    removeImg = false;
    localUrl="";
    

    constructor(private http: HttpClient, private _employeeService : EmployeeService,private _router: Router
     ) {
    }

    ngOnInit(): void {
      if(this._employeeService.empNum === 'ec0001'){
        this.empImg = null;      
      }
     
     console.log("this was the email on init "+ this.userEmail + " and EmpNum " + this._employeeService.empNum);
      this.getUser(this.userEmail);
      this.getUserImg(this._employeeService.empNum);
    }

    
 
     transformFile = (file: NzUploadFile): Observable<Blob> =>
    new Observable((observer: Observer<Blob>) => {
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.readAsDataURL(file as any);
      reader.onload = () => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = reader.result as string;
        this.localUrl = img.src;
        console.log(this.localUrl + "wewe");
        img.onload = () => {
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob(blob => {
            observer.next(blob!);
            observer.complete();
          });
        };
      };
    });
   

    customUploadReq = (item: any) => {
      this._employeeService.ephoto = item.file as any;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
 
      const formData = new FormData();
      formData.append('data', item.file as any); // tslint:disable-next-line:no-any
   
      formData.append('id', this._employeeService.empNum);
      
      
      //this.empImg = item;
      // const req = new HttpRequest('POST', 'http://localhost:14696/api/v1/EmployeePhoto', formData);
      // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
     return this.http.post(environment.apiUrl+'/EmployeePhoto',formData).subscribe((event: any) => {
       console.log(item.file);
       item.status= 'done';
       item.onSuccess(item.file);
       console.log(event.Data);
       //this.getUserImg(this._employeeService.empNum);
       
      },(err) => { 
        console.log(err);
      },
      ()=>{
        item.status= 'done';
       // this._router.navigate(['resourcemanagement']);
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
        if(this.empImg == null){
          this.removeImg = false;
        }
        else{
          this.removeImg = true;
        }
      });
     }
  


  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };



}