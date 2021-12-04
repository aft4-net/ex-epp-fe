import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { CountryDetailStateService } from "../../../../state-services/country-detail.state-service";

@Component({
    selector: 'exec-epp-custom-nationality',
    templateUrl: './custom-nationality.component.html',
    styleUrls: ['./custom-nationality.component.scss']
  })
export class CustomNationalityComponent implements OnInit {

    list$: Observable<string[]>
    label = 'Nationality(ies)'
    maxAmount = 2
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true
    errMessage = ''

    constructor(
        private readonly _countryDetailStateService: CountryDetailStateService
    ) {
        this.list$ = this._countryDetailStateService.nationalities$
    }

    ngOnInit(): void {
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}