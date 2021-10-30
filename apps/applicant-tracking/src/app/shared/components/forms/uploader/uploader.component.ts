import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() acceptedFiles : string = '';
  @Input() beforeUpload : any;
  @Input() action : any;
  @Input() file : any;
  @Input() fileList :any;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  progress = 0;
  message = '';
  @Output() public onUploadFinished = new EventEmitter();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onChangeEvent(e:any){
    this.onChange.emit(e);

    //console.log(e.file);

    return;
    const file =<File> e.file;
    if (!file) {
      return;
    }

    //let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / 1);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
