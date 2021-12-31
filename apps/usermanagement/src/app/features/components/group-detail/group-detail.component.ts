import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'exec-epp-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
 
  constructor(private userService : UserService,private _router: Router,private fb: FormBuilder) {

  }
  size: NzButtonSize = 'small';
  ngOnInit(): void {
    
  }
}
