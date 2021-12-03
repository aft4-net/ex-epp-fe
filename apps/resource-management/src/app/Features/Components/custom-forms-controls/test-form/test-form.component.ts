import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { of } from "rxjs";

@Component({
    selector: 'exec-epp-test-form',
    templateUrl: './test-form.component.html',
    styleUrls: ['./test-form.component.scss']
  })
export class TestFormComponent implements OnInit {

  genders$ = of(['Male', 'Female', 'Other'])

    constructor() {
    }

    ngOnInit(): void {
    }


}