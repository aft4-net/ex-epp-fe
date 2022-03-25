import { Component, Input, OnInit } from "@angular/core";
import { NzModalComponent } from "ng-zorro-antd/modal";
import { Address } from "../../../../Models/address.model";

@Component({
    selector: 'exec-epp-rm-address-modal',
    templateUrl: './address-modal.component.html',
    styleUrls: [
        './address-modal.component.scss'
    ]
})
export class RMAddressModalComponent implements OnInit {

    @Input() address?: Address
    @Input() title = 'EPP Modal';
    @Input() visible = false;
    /**
     *
     */
    constructor(
        private readonly _modal: NzModalComponent
    ) {}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    
}